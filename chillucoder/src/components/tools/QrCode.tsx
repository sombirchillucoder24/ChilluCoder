"use client"
import { useState, useRef } from 'react';
import QRCode from 'qrcode';
import type { QRCodeRenderersOptions } from 'qrcode';
import NextImage from 'next/image'; // Renamed import to avoid conflict

type QRDataType = 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'contact';
type LogoShape = 'circle' | 'square' | 'rounded' | 'none';

interface FormData {
  url: string;
  text: string;
  email: string;
  emailSubject: string;
  emailBody: string;
  phone: string;
  smsPhone: string;
  smsMessage: string;
  wifiSsid: string;
  wifiPassword: string;
  wifiEncryption: 'WPA' | 'WEP' | 'nopass';
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

const QRCodeGenerator = () => {
  const [activeTab, setActiveTab] = useState<QRDataType>('url');
  const [formData, setFormData] = useState<FormData>({
    url: '',
    text: '',
    email: '',
    emailSubject: '',
    emailBody: '',
    phone: '',
    smsPhone: '',
    smsMessage: '',
    wifiSsid: '',
    wifiPassword: '',
    wifiEncryption: 'WPA',
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });
  const [qrCode, setQrCode] = useState('');
  const [size, setSize] = useState(300);
  const [error, setError] = useState('');
  const [darkColor, setDarkColor] = useState('#000000');
  const [lightColor, setLightColor] = useState('#FFFFFF');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoShape, setLogoShape] = useState<LogoShape>('circle');
  const [logoSize, setLogoSize] = useState(15);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError('Please select an image file (JPEG, PNG)');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Image size should be less than 2MB');
      return;
    }

    setError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      setLogoPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const generateQRCode = async () => {
    setIsGenerating(true);
    setError('');
    
    try {
      let qrContent = '';

      // Generate QR content based on active tab
      switch (activeTab) {
        case 'url':
          if (!formData.url.trim()) {
            setError('Please enter a URL');
            return;
          }
          qrContent = formData.url.startsWith('http') ? formData.url : `https://${formData.url}`;
          break;
        case 'text':
          if (!formData.text.trim()) {
            setError('Please enter some text');
            return;
          }
          qrContent = formData.text;
          break;
        case 'email':
          if (!formData.email.trim()) {
            setError('Please enter an email address');
            return;
          }
          qrContent = `mailto:${formData.email}`;
          if (formData.emailSubject) qrContent += `?subject=${encodeURIComponent(formData.emailSubject)}`;
          if (formData.emailBody) qrContent += `${formData.emailSubject ? '&' : '?'}body=${encodeURIComponent(formData.emailBody)}`;
          break;
        case 'phone':
          if (!formData.phone.trim()) {
            setError('Please enter a phone number');
            return;
          }
          qrContent = `tel:${formData.phone.replace(/[^0-9+]/g, '')}`;
          break;
        case 'sms':
          if (!formData.smsPhone.trim()) {
            setError('Please enter a phone number');
            return;
          }
          qrContent = `sms:${formData.smsPhone.replace(/[^0-9+]/g, '')}`;
          if (formData.smsMessage) qrContent += `?body=${encodeURIComponent(formData.smsMessage)}`;
          break;
        case 'wifi':
          if (!formData.wifiSsid.trim()) {
            setError('Please enter a WiFi SSID');
            return;
          }
          qrContent = `WIFI:T:${formData.wifiEncryption};S:${formData.wifiSsid};P:${formData.wifiPassword || ''};;`;
          break;
        case 'contact':
          if (!formData.contactName.trim() && !formData.contactPhone.trim() && !formData.contactEmail.trim()) {
            setError('Please enter at least one contact detail');
            return;
          }
          qrContent = `BEGIN:VCARD\nVERSION:3.0\n`;
          if (formData.contactName) qrContent += `FN:${formData.contactName}\n`;
          if (formData.contactPhone) qrContent += `TEL:${formData.contactPhone}\n`;
          if (formData.contactEmail) qrContent += `EMAIL:${formData.contactEmail}\n`;
          qrContent += `END:VCARD`;
          break;
        default:
          setError('Invalid QR code type');
          return;
      }

      // Create canvas with larger size to ensure proper error correction
      const canvas = document.createElement('canvas');
      const qrOptions: QRCodeRenderersOptions = {
        width: size + 100,
        margin: 4,
        color: {
          dark: darkColor,
          light: lightColor
        },
        errorCorrectionLevel: 'H'
      };

      await QRCode.toCanvas(canvas, qrContent, qrOptions);

      // If logo is selected
      if (logoPreview) {
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');

        // Calculate logo dimensions (reduced size)
        const logoWidth = (size * logoSize) / 100;
        const logoHeight = logoWidth;
        const centerX = (size - logoWidth) / 2 + 50;
        const centerY = (size - logoHeight) / 2 + 50;

        // Create temporary canvas for logo to ensure proper scaling
        const logoCanvas = document.createElement('canvas');
        logoCanvas.width = logoWidth;
        logoCanvas.height = logoHeight;
        const logoCtx = logoCanvas.getContext('2d');
        if (!logoCtx) throw new Error('Could not get logo canvas context');

        // Draw logo on temporary canvas - use native Image constructor
        const logoImg = new window.Image(); // Use native browser Image constructor
        logoImg.src = logoPreview;
        await new Promise<void>((resolve) => {
          logoImg.onload = () => resolve();
        });

        // Apply shape mask to logo
        logoCtx.save();
        if (logoShape === 'circle') {
          logoCtx.beginPath();
          logoCtx.arc(logoWidth / 2, logoHeight / 2, logoWidth / 2, 0, Math.PI * 2);
          logoCtx.clip();
        } else if (logoShape === 'rounded') {
          const radius = logoWidth / 8;
          logoCtx.beginPath();
          logoCtx.moveTo(radius, 0);
          logoCtx.lineTo(logoWidth - radius, 0);
          logoCtx.quadraticCurveTo(logoWidth, 0, logoWidth, radius);
          logoCtx.lineTo(logoWidth, logoHeight - radius);
          logoCtx.quadraticCurveTo(logoWidth, logoHeight, logoWidth - radius, logoHeight);
          logoCtx.lineTo(radius, logoHeight);
          logoCtx.quadraticCurveTo(0, logoHeight, 0, logoHeight - radius);
          logoCtx.lineTo(0, radius);
          logoCtx.quadraticCurveTo(0, 0, radius, 0);
          logoCtx.closePath();
          logoCtx.clip();
        }

        logoCtx.drawImage(logoImg, 0, 0, logoWidth, logoHeight);
        logoCtx.restore();

        // Draw the shaped logo onto the QR code
        ctx.drawImage(logoCanvas, centerX, centerY, logoWidth, logoHeight);

        // Add border around logo for better contrast
        if (logoShape !== 'none') {
          ctx.strokeStyle = lightColor;
          ctx.lineWidth = Math.max(2, logoWidth / 20);
          
          if (logoShape === 'circle') {
            ctx.beginPath();
            ctx.arc(
              size / 2 + 50,
              size / 2 + 50,
              logoWidth / 2,
              0,
              Math.PI * 2
            );
            ctx.stroke();
          } else if (logoShape === 'rounded') {
            const radius = logoWidth / 8;
            ctx.beginPath();
            ctx.moveTo(centerX + radius, centerY);
            ctx.lineTo(centerX + logoWidth - radius, centerY);
            ctx.quadraticCurveTo(centerX + logoWidth, centerY, centerX + logoWidth, centerY + radius);
            ctx.lineTo(centerX + logoWidth, centerY + logoHeight - radius);
            ctx.quadraticCurveTo(centerX + logoWidth, centerY + logoHeight, centerX + logoWidth - radius, centerY + logoHeight);
            ctx.lineTo(centerX + radius, centerY + logoHeight);
            ctx.quadraticCurveTo(centerX, centerY + logoHeight, centerX, centerY + logoHeight - radius);
            ctx.lineTo(centerX, centerY + radius);
            ctx.quadraticCurveTo(centerX, centerY, centerX + radius, centerY);
            ctx.closePath();
            ctx.stroke();
          } else {
            ctx.strokeRect(centerX, centerY, logoWidth, logoHeight);
          }
        }
      }

      // Create final canvas with correct dimensions
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = size;
      finalCanvas.height = size;
      const finalCtx = finalCanvas.getContext('2d');
      if (!finalCtx) throw new Error('Could not get final canvas context');

      // Draw the QR code onto the final canvas
      finalCtx.drawImage(canvas, 50, 50, size, size, 0, 0, size, size);

      setQrCode(finalCanvas.toDataURL('image/png'));
    } catch (err) {
      setError('Failed to generate QR code. The logo might be too large or complex. Try reducing the logo size.');
      console.error('QR Code generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCode) return;

    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `qrcode-${activeTab}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs: { id: QRDataType; label: string }[] = [
    { id: 'url', label: 'URL' },
    { id: 'text', label: 'Text' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { id: 'sms', label: 'SMS' },
    { id: 'wifi', label: 'WiFi' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">QR Code Generator</h1>
          <p className="text-gray-600 text-center mb-6">Create customized QR codes with your logo</p>

          {/* Tabs */}
          <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg mr-2 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Content */}
          <div className="mb-8">
            {activeTab === 'url' && (
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                  Website URL
                </label>
                <input
                  type="text"
                  id="url"
                  value={formData.url}
                  onChange={(e) => handleInputChange('url', e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            {activeTab === 'text' && (
              <div>
                <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
                  Text Content
                </label>
                <textarea
                  id="text"
                  value={formData.text}
                  onChange={(e) => handleInputChange('text', e.target.value)}
                  placeholder="Enter any text"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            {activeTab === 'email' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="recipient@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="emailSubject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject (optional)
                  </label>
                  <input
                    type="text"
                    id="emailSubject"
                    value={formData.emailSubject}
                    onChange={(e) => handleInputChange('emailSubject', e.target.value)}
                    placeholder="Email subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="emailBody" className="block text-sm font-medium text-gray-700 mb-1">
                    Message (optional)
                  </label>
                  <textarea
                    id="emailBody"
                    value={formData.emailBody}
                    onChange={(e) => handleInputChange('emailBody', e.target.value)}
                    placeholder="Email body content"
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {activeTab === 'phone' && (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1234567890"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            {activeTab === 'sms' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="smsPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="smsPhone"
                    value={formData.smsPhone}
                    onChange={(e) => handleInputChange('smsPhone', e.target.value)}
                    placeholder="+1234567890"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="smsMessage" className="block text-sm font-medium text-gray-700 mb-1">
                    Message (optional)
                  </label>
                  <textarea
                    id="smsMessage"
                    value={formData.smsMessage}
                    onChange={(e) => handleInputChange('smsMessage', e.target.value)}
                    placeholder="Your SMS message"
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {activeTab === 'wifi' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="wifiSsid" className="block text-sm font-medium text-gray-700 mb-1">
                    WiFi Network Name (SSID)
                  </label>
                  <input
                    type="text"
                    id="wifiSsid"
                    value={formData.wifiSsid}
                    onChange={(e) => handleInputChange('wifiSsid', e.target.value)}
                    placeholder="Your WiFi name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="wifiPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Password (optional)
                  </label>
                  <input
                    type="password"
                    id="wifiPassword"
                    value={formData.wifiPassword}
                    onChange={(e) => handleInputChange('wifiPassword', e.target.value)}
                    placeholder="WiFi password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="wifiEncryption" className="block text-sm font-medium text-gray-700 mb-1">
                    Security Type
                  </label>
                  <select
                    id="wifiEncryption"
                    value={formData.wifiEncryption}
                    onChange={(e) => handleInputChange('wifiEncryption', e.target.value as 'WPA' | 'WEP' | 'nopass')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="WPA">WPA/WPA2 (Recommended)</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">No Password</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                    Name (optional)
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    placeholder="Full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    placeholder="Phone number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    placeholder="Email address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* QR Code Customization */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Customization</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Logo Settings */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Logo Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Upload Logo (optional)
                    </label>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Select Image
                      </button>
                      {logoPreview && (
                        <button
                          type="button"
                          onClick={removeLogo}
                          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          Remove
                        </button>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Max 2MB, transparent PNG recommended</p>
                  </div>

                  {logoPreview && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className={`overflow-hidden ${
                            logoShape === 'circle' ? 'rounded-full' : 
                            logoShape === 'rounded' ? 'rounded-lg' : ''
                          }`}>
                            <NextImage
                              src={logoPreview}
                              alt="Logo preview"
                              width={64}
                              height={64}
                              className="w-16 h-16 object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div>
                            <label htmlFor="logoShape" className="block text-xs font-medium text-gray-500">
                              Shape
                            </label>
                            <select
                              id="logoShape"
                              value={logoShape}
                              onChange={(e) => setLogoShape(e.target.value as LogoShape)}
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                            >
                              <option value="circle">Circle</option>
                              <option value="square">Square</option>
                              <option value="rounded">Rounded</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="logoSize" className="block text-xs font-medium text-gray-500">
                              Size: {logoSize}% (recommended 10-15%)
                            </label>
                            <input
                              type="range"
                              id="logoSize"
                              min="5"
                              max="20"
                              value={logoSize}
                              onChange={(e) => setLogoSize(parseInt(e.target.value))}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* QR Code Settings */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">QR Code Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="size" className="block text-xs font-medium text-gray-500 mb-1">
                      Size: {size}px (minimum 200px recommended)
                    </label>
                    <input
                      type="range"
                      id="size"
                      min="150"
                      max="500"
                      value={size}
                      onChange={(e) => setSize(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="darkColor" className="block text-xs font-medium text-gray-500 mb-1">
                        Dark Color
                      </label>
                      <div className="flex items-center">
                        <input
                          type="color"
                          id="darkColor"
                          value={darkColor}
                          onChange={(e) => setDarkColor(e.target.value)}
                          className="w-8 h-8 cursor-pointer mr-2"
                        />
                        <input
                          type="text"
                          value={darkColor}
                          onChange={(e) => setDarkColor(e.target.value)}
                          className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="lightColor" className="block text-xs font-medium text-gray-500 mb-1">
                        Light Color
                      </label>
                      <div className="flex items-center">
                        <input
                          type="color"
                          id="lightColor"
                          value={lightColor}
                          onChange={(e) => setLightColor(e.target.value)}
                          className="w-8 h-8 cursor-pointer mr-2"
                        />
                        <input
                          type="text"
                          value={lightColor}
                          onChange={(e) => setLightColor(e.target.value)}
                          className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={generateQRCode}
              disabled={isGenerating}
              className={`flex-1 px-6 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isGenerating
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white'
              }`}
            >
              {isGenerating ? 'Generating...' : 'Generate QR Code'}
            </button>
            
            {qrCode && (
              <button
                onClick={downloadQRCode}
                className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Download QR Code
              </button>
            )}
          </div>

          {/* QR Code Preview */}
          {qrCode && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Your QR Code</h2>
              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-lg shadow-inner border border-gray-200">
                  <NextImage
                    src={qrCode}
                    alt="Generated QR Code"
                    width={300}
                    height={300}
                    className="w-full max-w-xs"
                    style={{ backgroundColor: lightColor }}
                  />
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700 text-center">
                  <strong>Tip:</strong> For best results, test your QR code with multiple scanners before distribution.
                  {logoPreview && " Logos should cover no more than 15% of the QR code area."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;