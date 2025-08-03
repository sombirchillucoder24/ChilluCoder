"use client";

import { FaCopy, FaCheck, FaChevronDown, FaCode, FaPlay } from "react-icons/fa";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HTMLDragDropTutorial() {
    const router = useRouter();
    const [copied, setCopied] = useState<string | null>(null);
    const [expandedSections, setExpandedSections] = useState<
        Record<string, boolean>
    >({
        basics: true,
        examples: true,
        advanced: true,
    });

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const copyToClipboard = (text: string, name: string) => {
        navigator.clipboard.writeText(text);
        setCopied(name);
        setTimeout(() => setCopied(null), 2000);
    };

    const handleOpenEditor = (code: string) => {
        try {
            localStorage.setItem("html-code", code);
            router.push("/compilers/html-editor");
        } catch (error) {
            console.error("Error saving to localStorage:", error);
            alert("Could not open editor. Please try again.");
        }
    };

    // Basic Example Preview
    const BasicExamplePreview = () => (
        <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex flex-col items-center">
            <div
                id="preview-draggable"
                draggable="true"
                onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', 'preview-draggable');
                }}
                className="w-24 h-24 bg-purple-600 text-white flex items-center justify-center cursor-move rounded-lg mb-4"
            >
                Drag me!
            </div>
            <div
                id="preview-droptarget"
                onDrop={(e) => {
                    e.preventDefault();
                    const draggable = document.getElementById('preview-draggable');
                    if (draggable && e.currentTarget) {
                        e.currentTarget.appendChild(draggable);
                    }
                }}
                onDragOver={(e) => e.preventDefault()}
                className="w-48 h-48 border-2 border-dashed border-gray-400 dark:border-gray-500 flex items-center justify-center rounded-lg"
            >
                Drop here
            </div>
        </div>
    );

    // Multiple Items Preview
    const MultipleItemsPreview = () => (
        <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex flex-col items-center">
            <div className="flex gap-2 mb-4">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        id={`preview-item-${i}`}
                        draggable="true"
                        onDragStart={(e) => {
                            e.dataTransfer.setData('text/plain', `preview-item-${i}`);
                            e.currentTarget.style.opacity = '0.4';
                        }}
                        onDragEnd={(e) => {
                            e.currentTarget.style.opacity = '1';
                        }}
                        className="w-20 h-20 bg-purple-600 text-white flex items-center justify-center cursor-move rounded-lg"
                    >
                        Item {i}
                    </div>
                ))}
            </div>
            <div
                id="preview-droptarget-multi"
                onDrop={(e) => {
                    e.preventDefault();
                    const id = e.dataTransfer.getData('text/plain');
                    const draggable = document.getElementById(id);
                    if (draggable && e.currentTarget) {
                        e.currentTarget.appendChild(draggable);
                        draggable.style.opacity = '1';
                    }
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.borderColor = '#8b5cf6';
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.borderColor = '#9ca3af';
                }}
                className="w-64 h-32 border-2 border-dashed border-gray-400 dark:border-gray-500 flex flex-wrap items-start justify-start p-2 gap-2 rounded-lg"
            >
                Drop items here
            </div>
        </div>
    );

    // Sortable List Preview
    const SortableListPreview = () => {
        const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);

        const handleDragStart = (e: React.DragEvent, index: number) => {
            e.dataTransfer.setData('text/plain', index.toString());
            e.currentTarget.classList.add('dragging');
        };

        const handleDragOver = (e: React.DragEvent) => {
            e.preventDefault();
            const list = e.currentTarget as HTMLElement;
            const draggingItem = list.querySelector('.dragging') as HTMLElement;
            if (!draggingItem) return;

            const afterElement = getDragAfterElement(list, e.clientY);
            if (afterElement) {
                list.insertBefore(draggingItem, afterElement);
            } else {
                list.appendChild(draggingItem);
            }
        };

        const getDragAfterElement = (container: HTMLElement, y: number) => {
            const draggableElements = [...container.querySelectorAll('li:not(.dragging)')] as HTMLElement[];

            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element;
        };

        const handleDragEnd = (e: React.DragEvent) => {
            e.currentTarget.classList.remove('dragging');
        };

        return (
            <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex flex-col items-center">
                <ul
                    className="list-none p-0 w-48"
                    onDragOver={handleDragOver}
                >
                    {items.map((item, index) => (
                        <li
                            key={index}
                            draggable="true"
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragEnd={handleDragEnd}
                            className="p-2 my-1 bg-gray-200 dark:bg-gray-600 rounded cursor-move"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    // File Drop Preview
    const FileDropPreview = () => {
        const [files, setFiles] = useState<File[]>([]);

        const handleDrop = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            e.currentTarget.style.backgroundColor = '';

            if (e.dataTransfer.files.length) {
                setFiles(Array.from(e.dataTransfer.files));
            }
        };

        const formatFileSize = (bytes: number) => {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        };

        return (
            <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex flex-col items-center">
                <div
                    id="preview-dropzone"
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.currentTarget.style.backgroundColor = '#e9d5ff';
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.currentTarget.style.backgroundColor = '';
                    }}
                    onDrop={handleDrop}
                    className="w-64 h-32 border-2 border-dashed border-purple-500 rounded-lg flex flex-col items-center justify-center p-4"
                >
                    Drop files here
                    <div id="preview-filelist" className="mt-2 text-sm">
                        {files.length > 0 ? (
                            <div>
                                <p>{files.length} file(s) selected:</p>
                                <ul className="list-disc pl-5">
                                    {files.map((file, i) => (
                                        <li key={i}>
                                            {file.name} ({formatFileSize(file.size)})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    };

    // Custom Drag Image Preview
    const CustomDragImagePreview = () => {
        const handleDragStart = (e: React.DragEvent) => {
            // Create a custom drag image
            const dragImg = document.createElement('div');
            dragImg.innerHTML = 'Custom Drag Image';
            dragImg.style.padding = '10px';
            dragImg.style.background = '#4f46e5';
            dragImg.style.color = 'white';
            dragImg.style.borderRadius = '4px';

            document.body.appendChild(dragImg);
            dragImg.style.position = 'absolute';
            dragImg.style.left = '-9999px';

            e.dataTransfer.setDragImage(dragImg, 0, 0);
            e.dataTransfer.setData('text/plain', 'preview-custom-drag');

            setTimeout(() => document.body.removeChild(dragImg), 0);
        };

        return (
            <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex flex-col items-center">
                <div
                    id="preview-custom-drag"
                    draggable="true"
                    onDragStart={handleDragStart}
                    className="w-32 h-32 bg-purple-600 text-white flex items-center justify-center cursor-move rounded-lg mb-4"
                >
                    Drag me (custom image)
                </div>
                <div
                    id="preview-custom-drop"
                    onDrop={(e) => {
                        e.preventDefault();
                        const draggable = document.getElementById('preview-custom-drag');
                        if (draggable && e.currentTarget) {
                            e.currentTarget.appendChild(draggable);
                        }
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    className="w-48 h-48 border-2 border-dashed border-gray-400 dark:border-gray-500 flex items-center justify-center rounded-lg"
                >
                    Drop here
                </div>
            </div>
        );
    };

    // Drag Between Containers Preview
    const DragBetweenContainersPreview = () => {
        const [containers, setContainers] = useState([
            ['Item 1', 'Item 2'],
            ['Item 3', 'Item 4']
        ]);

        const handleDragStart = (e: React.DragEvent, containerIndex: number, itemIndex: number) => {
            e.dataTransfer.setData('text/plain', JSON.stringify({
                containerIndex,
                itemIndex
            }));
            e.currentTarget.style.opacity = '0.4';
        };

        const handleDragOver = (e: React.DragEvent, targetContainerIndex: number) => {
            e.preventDefault();
            e.currentTarget.style.backgroundColor = '#e9d5ff';

            const data = e.dataTransfer.getData('text/plain');
            if (!data) return;

            const { containerIndex: sourceContainerIndex, itemIndex } = JSON.parse(data);

            if (sourceContainerIndex === targetContainerIndex) return;

            const afterElement = getDragAfterElement(e.currentTarget as HTMLElement, e.clientY);
            if (afterElement) {
                // Visual feedback only - actual movement handled by onDrop
            }
        };

        const handleDrop = (e: React.DragEvent, targetContainerIndex: number) => {
            e.preventDefault();
            e.currentTarget.style.backgroundColor = '';

            const data = e.dataTransfer.getData('text/plain');
            if (!data) return;

            const { containerIndex: sourceContainerIndex, itemIndex } = JSON.parse(data);

            if (sourceContainerIndex === targetContainerIndex) return;

            setContainers(prev => {
                const newContainers = [...prev];
                const [movedItem] = newContainers[sourceContainerIndex].splice(itemIndex, 1);
                newContainers[targetContainerIndex].push(movedItem);
                return newContainers;
            });
        };

        const handleDragLeave = (e: React.DragEvent) => {
            e.preventDefault();
            e.currentTarget.style.backgroundColor = '';
        };

        const handleDragEnd = (e: React.DragEvent) => {
            e.currentTarget.style.opacity = '1';
        };

        const getDragAfterElement = (container: HTMLElement, y: number) => {
            const draggableElements = [...container.querySelectorAll('.preview-container-item')] as HTMLElement[];

            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element;
        };

        return (
            <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex flex-col items-center">
                <div className="flex gap-4">
                    {containers.map((container, containerIndex) => (
                        <div
                            key={containerIndex}
                            className="w-48 min-h-48 border-2 border-purple-500 rounded-lg p-3 bg-white dark:bg-gray-800"
                            onDragOver={(e) => handleDragOver(e, containerIndex)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, containerIndex)}
                        >
                            <h3 className="text-center text-purple-700 dark:text-purple-400 mb-2">
                                Container {containerIndex + 1}
                            </h3>
                            {container.map((item, itemIndex) => (
                                <div
                                    key={itemIndex}
                                    draggable="true"
                                    onDragStart={(e) => handleDragStart(e, containerIndex, itemIndex)}
                                    onDragEnd={handleDragEnd}
                                    className="preview-container-item p-2 my-1 bg-purple-100 dark:bg-purple-900 rounded cursor-move"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Data Transfer Preview
    const DataTransferPreview = () => {
        const [cart, setCart] = useState<{ name: string, price: number }[]>([]);
        const [total, setTotal] = useState(0);

        const products = [
            { id: '123', name: 'Product A', price: 19.99 },
            { id: '456', name: 'Product B', price: 29.99 }
        ];

        const handleDragStart = (e: React.DragEvent, product: { id: string, name: string, price: number }) => {
            // Create custom drag image
            const dragImg = document.createElement('div');
            dragImg.textContent = product.name;
            dragImg.style.padding = '5px 10px';
            dragImg.style.background = '#4f46e5';
            dragImg.style.color = 'white';
            dragImg.style.borderRadius = '4px';
            document.body.appendChild(dragImg);
            dragImg.style.position = 'absolute';
            dragImg.style.left = '-9999px';
            e.dataTransfer.setDragImage(dragImg, 0, 0);
            setTimeout(() => document.body.removeChild(dragImg), 0);

            // Store data
            e.dataTransfer.setData('text/plain', product.id);
            e.dataTransfer.setData('application/json', JSON.stringify(product));
        };

        const handleDrop = (e: React.DragEvent) => {
            e.preventDefault();

            const productData = e.dataTransfer.getData('application/json');
            if (!productData) return;

            const product = JSON.parse(productData);

            setCart(prev => [...prev, product]);
            setTotal(prev => prev + product.price);
        };

        return (
            <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex flex-col items-center">
                <div className="flex gap-4 mb-4">
                    {products.map(product => (
                        <div
                            key={product.id}
                            draggable="true"
                            onDragStart={(e) => handleDragStart(e, product)}
                            className="w-40 p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-move bg-white dark:bg-gray-800"
                        >
                            <h3 className="text-purple-700 dark:text-purple-400">{product.name}</h3>
                            <p className="font-bold">${product.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
                <div
                    id="preview-cart"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="w-64 p-4 border-2 border-dashed border-purple-500 rounded-lg"
                >
                    <h2 className="text-center mb-2">Shopping Cart</h2>
                    <div className="mb-2">
                        {cart.map((item, i) => (
                            <div key={i} className="p-1 bg-gray-200 dark:bg-gray-600 rounded mb-1">
                                {item.name} - ${item.price.toFixed(2)}
                            </div>
                        ))}
                    </div>
                    <p className="text-right font-bold">Total: ${total.toFixed(2)}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
                    HTML Drag and Drop Tutorial
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Learn how to implement native drag and drop functionality in your web applications
                </p>
            </header>

            {/* Introduction */}
            <section className="mb-8 bg-purple-50 dark:bg-gray-800 p-6 rounded-lg border border-purple-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-400">
                    Introduction to Drag and Drop
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                    HTML5 introduced a native Drag and Drop API that allows you to make elements draggable and create drop zones. This API works across modern browsers and provides events for customizing the drag and drop experience.
                </p>

                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg mb-4">
                    <h3 className="font-bold mb-2">Basic Drag and Drop Example:</h3>
                    <BasicExamplePreview />
                    <CodeEditor
                        value={`<!-- Draggable element -->
<div id="draggable" draggable="true" ondragstart="dragStart(event)">
  Drag me!
</div>

<!-- Drop target -->
<div id="droptarget" ondrop="drop(event)" ondragover="allowDrop(event)">
  Drop here
</div>

<script>
  function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
  }
  
  function allowDrop(e) {
    e.preventDefault();
  }
  
  function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    e.target.appendChild(draggable);
  }
</script>`}
                        language="html"
                        style={{
                            fontSize: 14,
                            backgroundColor: "#f8fafc",
                            fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                        }}
                        className="rounded-lg"
                    />
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => copyToClipboard(`<!-- Draggable element -->
<div id="draggable" draggable="true" ondragstart="dragStart(event)">
  Drag me!
</div>

<!-- Drop target -->
<div id="droptarget" ondrop="drop(event)" ondragover="allowDrop(event)">
  Drop here
</div>

<script>
  function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
  }
  
  function allowDrop(e) {
    e.preventDefault();
  }
  
  function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    e.target.appendChild(draggable);
  }
</script>`, "basic drag drop")}
                            className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                            {copied === "basic drag drop" ? (
                                <>
                                    <FaCheck className="text-green-500" /> Copied!
                                </>
                            ) : (
                                <>
                                    <FaCopy /> Copy
                                </>
                            )}
                        </button>
                        <button
                            onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Basic Drag and Drop</title>
  <style>
    #draggable {
      width: 100px;
      height: 100px;
      background: #4f46e5;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: move;
    }
    #droptarget {
      width: 200px;
      height: 200px;
      border: 2px dashed #666;
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>
</head>
<body>
  <div id="draggable" draggable="true" ondragstart="dragStart(event)">
    Drag me!
  </div>
  
  <div id="droptarget" ondrop="drop(event)" ondragover="allowDrop(event)">
    Drop here
  </div>
  
  <script>
    function dragStart(e) {
      e.dataTransfer.setData('text/plain', e.target.id);
    }
    
    function allowDrop(e) {
      e.preventDefault();
    }
    
    function drop(e) {
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain');
      const draggable = document.getElementById(id);
      e.target.appendChild(draggable);
    }
  </script>
</body>
</html>`)}
                            className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                        >
                            <FaPlay size={12} /> Try it
                        </button>
                    </div>
                </div>
            </section>

            {/* Basic Examples */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Basic Drag and Drop Examples
                    </h2>
                    <button
                        onClick={() => toggleSection("basics")}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                        <FaChevronDown
                            className={`transition-transform ${expandedSections.basics ? "rotate-180" : ""}`}
                        />
                    </button>
                </div>

                {expandedSections.basics && (
                    <div className="space-y-6">
                        {/* Example 1: Multiple Draggable Items */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="p-4 bg-white dark:bg-gray-800">
                                <h3 className="font-bold text-lg mb-2">1. Multiple Draggable Items</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Create multiple draggable elements that can be dropped into a target area.
                                </p>

                                <MultipleItemsPreview />
                                <div className="flex gap-2 mb-2">
                                    <button
                                        onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Multiple Draggable Items</title>
  <style>
    .draggable {
      width: 100px;
      height: 50px;
      background: #4f46e5;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px;
      cursor: move;
    }
    #droptarget {
      width: 300px;
      height: 200px;
      border: 2px dashed #666;
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
    }
  </style>
</head>
<body>
  <div class="draggable" draggable="true" ondragstart="dragStart(event)" id="item1">
    Item 1
  </div>
  <div class="draggable" draggable="true" ondragstart="dragStart(event)" id="item2">
    Item 2
  </div>
  <div class="draggable" draggable="true" ondragstart="dragStart(event)" id="item3">
    Item 3
  </div>

  <div id="droptarget" ondrop="drop(event)" ondragover="allowDrop(event)">
    Drop items here
  </div>

  <script>
    function dragStart(e) {
      e.dataTransfer.setData('text/plain', e.target.id);
      e.target.style.opacity = '0.4';
    }
    
    function allowDrop(e) {
      e.preventDefault();
      e.target.style.borderColor = '#4f46e5';
    }
    
    function drop(e) {
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain');
      const draggable = document.getElementById(id);
      e.target.appendChild(draggable);
      draggable.style.opacity = '1';
      e.target.style.borderColor = '#666';
    }
    
    // Reset border color when leaving drop target
    document.getElementById('droptarget').ondragleave = (e) => {
      e.preventDefault();
      e.target.style.borderColor = '#666';
    };
  </script>
</body>
</html>`)}
                                        className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                                    >
                                        <FaPlay size={12} /> Try it
                                    </button>
                                    <button
                                        onClick={() => copyToClipboard(`<div class="draggable" draggable="true" ondragstart="dragStart(event)" id="item1">
  Item 1
</div>
<div class="draggable" draggable="true" ondragstart="dragStart(event)" id="item2">
  Item 2
</div>
<div class="draggable" draggable="true" ondragstart="dragStart(event)" id="item3">
  Item 3
</div>

<div id="droptarget" ondrop="drop(event)" ondragover="allowDrop(event)">
  Drop items here
</div>

<script>
  function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.target.style.opacity = '0.4';
  }
  
  function allowDrop(e) {
    e.preventDefault();
    e.target.style.borderColor = '#4f46e5';
  }
  
  function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    e.target.appendChild(draggable);
    draggable.style.opacity = '1';
    e.target.style.borderColor = '#666';
  }
  
  // Reset border color when leaving drop target
  document.getElementById('droptarget').ondragleave = (e) => {
    e.preventDefault();
    e.target.style.borderColor = '#666';
  };
</script>`, "multiple items")}
                                        className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                                    >
                                        {copied === "multiple items" ? (
                                            <>
                                                <FaCheck className="text-green-500" /> Copied!
                                            </>
                                        ) : (
                                            <>
                                                <FaCopy /> Copy Code
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Example 2: Drag and Drop List */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="p-4 bg-white dark:bg-gray-800">
                                <h3 className="font-bold text-lg mb-2">2. Sortable List</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Create a sortable list where items can be reordered by dragging.
                                </p>

                                <SortableListPreview />
                                <div className="flex gap-2 mb-2">
                                    <button
                                        onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Sortable List</title>
  <style>
    #sortable-list {
      list-style: none;
      padding: 0;
      width: 200px;
    }
    #sortable-list li {
      padding: 10px;
      margin: 5px 0;
      background: #f3f4f6;
      border: 1px solid #e5e7eb;
      cursor: move;
    }
    #sortable-list li:hover {
      background: #e5e7eb;
    }
  </style>
</head>
<body>
  <ul id="sortable-list">
    <li draggable="true" ondragstart="dragStart(event)">Item 1</li>
    <li draggable="true" ondragstart="dragStart(event)">Item 2</li>
    <li draggable="true" ondragstart="dragStart(event)">Item 3</li>
    <li draggable="true" ondragstart="dragStart(event)">Item 4</li>
  </ul>

  <script>
    let draggedItem = null;
    
    function dragStart(e) {
      draggedItem = e.target;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', e.target.innerHTML);
      e.target.style.opacity = '0.4';
    }
    
    document.getElementById('sortable-list').addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      
      const afterElement = getDragAfterElement(e.target, e.clientY);
      if (afterElement) {
        afterElement.parentNode.insertBefore(draggedItem, afterElement);
      }
    });
    
    document.getElementById('sortable-list').addEventListener('dragend', (e) => {
      e.target.style.opacity = '1';
    });
    
    function getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];
      
      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
  </script>
</body>
</html>`)}
                                        className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                                    >
                                        <FaPlay size={12} /> Try it
                                    </button>
                                    <button
                                        onClick={() => copyToClipboard(`<ul id="sortable-list">
  <li draggable="true" ondragstart="dragStart(event)">Item 1</li>
  <li draggable="true" ondragstart="dragStart(event)">Item 2</li>
  <li draggable="true" ondragstart="dragStart(event)">Item 3</li>
  <li draggable="true" ondragstart="dragStart(event)">Item 4</li>
</ul>

<script>
  let draggedItem = null;
  
  function dragStart(e) {
    draggedItem = e.target;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
    e.target.style.opacity = '0.4';
  }
  
  document.getElementById('sortable-list').addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    const afterElement = getDragAfterElement(e.target, e.clientY);
    if (afterElement) {
      afterElement.parentNode.insertBefore(draggedItem, afterElement);
    }
  });
  
  document.getElementById('sortable-list').addEventListener('dragend', (e) => {
    e.target.style.opacity = '1';
  });
  
  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
</script>`, "sortable list")}
                                        className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                                    >
                                        {copied === "sortable list" ? (
                                            <>
                                                <FaCheck className="text-green-500" /> Copied!
                                            </>
                                        ) : (
                                            <>
                                                <FaCopy /> Copy Code
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Example 3: File Drag and Drop */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="p-4 bg-white dark:bg-gray-800">
                                <h3 className="font-bold text-lg mb-2">3. File Drag and Drop</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Implement file upload functionality by dragging files from the desktop.
                                </p>

                                <FileDropPreview />
                                <div className="flex gap-2 mb-2">
                                    <button
                                        onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>File Drag and Drop</title>
  <style>
    #dropzone {
      width: 400px;
      height: 200px;
      border: 2px dashed #8b5cf6;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
      transition: background-color 0.3s;
    }
    #dropzone.highlight {
      background-color: #e9d5ff;
    }
    #preview {
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div id="dropzone" 
       ondragover="allowDrop(event)" 
       ondragleave="dragLeave(event)" 
       ondrop="handleDrop(event)">
    Drop files here
    <div id="preview"></div>
  </div>

  <script>
    function allowDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      e.target.style.backgroundColor = '#e9d5ff';
    }
    
    function dragLeave(e) {
      e.preventDefault();
      e.stopPropagation();
      e.target.style.backgroundColor = '';
    }
    
    function handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      e.target.style.backgroundColor = '';
      
      const files = e.dataTransfer.files;
      const preview = document.getElementById('preview');
      preview.innerHTML = '';
      
      if (files.length) {
        preview.innerHTML = \`<p>\${files.length} file(s) selected:</p><ul>\`;
        
        Array.from(files).forEach(file => {
          preview.innerHTML += \`<li>\${file.name} (\${formatFileSize(file.size)})</li>\`;
          
          // You could upload the file here with FormData and fetch/XMLHttpRequest
        });
        
        preview.innerHTML += '</ul>';
      }
    }
    
    function formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i]);
    }
  </script>
</body>
</html>`)}
                                        className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                                    >
                                        <FaPlay size={12} /> Try it
                                    </button>
                                    <button
                                        onClick={() => copyToClipboard(`<div id="dropzone" 
     ondragover="allowDrop(event)" 
     ondragleave="dragLeave(event)" 
     ondrop="handleDrop(event)">
  Drop files here
  <div id="preview"></div>
</div>

<script>
  function allowDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.backgroundColor = '#e9d5ff';
  }
  
  function dragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.backgroundColor = '';
  }
  
  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.backgroundColor = '';
    
    const files = e.dataTransfer.files;
    const preview = document.getElementById('preview');
    preview.innerHTML = '';
    
    if (files.length) {
      preview.innerHTML = \`<p>\${files.length} file(s) selected:</p><ul>\`;
      
      Array.from(files).forEach(file => {
        preview.innerHTML += \`<li>\${file.name} (\${formatFileSize(file.size)})</li>\`;
        
        // You could upload the file here with FormData and fetch/XMLHttpRequest
      });
      
      preview.innerHTML += '</ul>';
    }
  }
  
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
  }
</script>`, "file drop")}
                                        className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                                    >
                                        {copied === "file drop" ? (
                                            <>
                                                <FaCheck className="text-green-500" /> Copied!
                                            </>
                                        ) : (
                                            <>
                                                <FaCopy /> Copy Code
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* Advanced Techniques */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Advanced Drag and Drop Techniques
                    </h2>
                    <button
                        onClick={() => toggleSection("advanced")}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                        <FaChevronDown
                            className={`transition-transform ${expandedSections.advanced ? "rotate-180" : ""}`}
                        />
                    </button>
                </div>

                {expandedSections.advanced && (
                    <div className="space-y-6">
                        {/* Example 1: Custom Drag Image */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="p-4 bg-white dark:bg-gray-800">
                                <h3 className="font-bold text-lg mb-2">1. Custom Drag Image</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Customize the drag image that appears while dragging an element.
                                </p>

                                <CustomDragImagePreview />
                                <div className="flex gap-2 mb-2">
                                    <button
                                        onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Custom Drag Image</title>
  <style>
    #draggable {
      width: 150px;
      height: 80px;
      background: #4f46e5;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: move;
      border-radius: 8px;
    }
    #droptarget {
      width: 300px;
      height: 200px;
      border: 2px dashed #666;
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>
</head>
<body>
  <div id="draggable" draggable="true" ondragstart="dragStart(event)">
    Drag me (custom image)
  </div>

  <div id="droptarget" ondrop="drop(event)" ondragover="allowDrop(event)">
    Drop here
  </div>

  <script>
    function dragStart(e) {
      // Create a custom drag image
      const dragImg = document.createElement('div');
      dragImg.innerHTML = 'Custom Drag Image';
      dragImg.style.padding = '10px';
      dragImg.style.background = '#4f46e5';
      dragImg.style.color = 'white';
      dragImg.style.borderRadius = '4px';
      
      // Append to document but make it invisible
      document.body.appendChild(dragImg);
      dragImg.style.position = 'absolute';
      dragImg.style.left = '-9999px';
      
      // Set the drag image
      e.dataTransfer.setDragImage(dragImg, 0, 0);
      
      // Store the element ID
      e.dataTransfer.setData('text/plain', e.target.id);
      
      // Remove the temporary element after a short delay
      setTimeout(() => document.body.removeChild(dragImg), 0);
    }
    
    function allowDrop(e) {
      e.preventDefault();
    }
    
    function drop(e) {
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain');
      const draggable = document.getElementById(id);
      e.target.appendChild(draggable);
    }
  </script>
</body>
</html>`)}
                                        className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                                    >
                                        <FaPlay size={12} /> Try it
                                    </button>
                                    <button
                                        onClick={() => copyToClipboard(`<div id="draggable" draggable="true" ondragstart="dragStart(event)">
  Drag me (custom image)
</div>

<div id="droptarget" ondrop="drop(event)" ondragover="allowDrop(event)">
  Drop here
</div>

<script>
  function dragStart(e) {
    // Create a custom drag image
    const dragImg = document.createElement('div');
    dragImg.innerHTML = 'Custom Drag Image';
    dragImg.style.padding = '10px';
    dragImg.style.background = '#4f46e5';
    dragImg.style.color = 'white';
    dragImg.style.borderRadius = '4px';
    
    // Append to document but make it invisible
    document.body.appendChild(dragImg);
    dragImg.style.position = 'absolute';
    dragImg.style.left = '-9999px';
    
    // Set the drag image
    e.dataTransfer.setDragImage(dragImg, 0, 0);
    
    // Store the element ID
    e.dataTransfer.setData('text/plain', e.target.id);
    
    // Remove the temporary element after a short delay
    setTimeout(() => document.body.removeChild(dragImg), 0);
  }
  
  function allowDrop(e) {
    e.preventDefault();
  }
  
  function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    e.target.appendChild(draggable);
  }
</script>`, "custom drag image")}
                                        className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                                    >
                                        {copied === "custom drag image" ? (
                                            <>
                                                <FaCheck className="text-green-500" /> Copied!
                                            </>
                                        ) : (
                                            <>
                                                <FaCopy /> Copy Code
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Example 2: Drag and Drop Between Containers */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="p-4 bg-white dark:bg-gray-800">
                                <h3 className="font-bold text-lg mb-2">2. Drag Between Containers</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Implement drag and drop between multiple containers with visual feedback.
                                </p>

                                <DragBetweenContainersPreview />
                                <div className="flex gap-2 mb-2">
                                    <button
                                        onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Drag Between Containers</title>
  <style>
    .container {
      width: 200px;
      min-height: 200px;
      border: 2px solid #8b5cf6;
      border-radius: 8px;
      padding: 10px;
      margin: 10px;
      display: inline-block;
      vertical-align: top;
      background: #f3f4f6;
      transition: background-color 0.3s;
    }
    .item {
      padding: 10px;
      margin: 5px 0;
      background: #4f46e5;
      color: white;
      border-radius: 4px;
      cursor: move;
    }
    h3 {
      margin-top: 0;
      color: #4f46e5;
    }
  </style>
</head>
<body>
  <div class="container">
    <h3>Container 1</h3>
    <div class="item" draggable="true" ondragstart="dragStart(event)" id="item1">Item 1</div>
    <div class="item" draggable="true" ondragstart="dragStart(event)" id="item2">Item 2</div>
  </div>

  <div class="container">
    <h3>Container 2</h3>
    <div class="item" draggable="true" ondragstart="dragStart(event)" id="item3">Item 3</div>
    <div class="item" draggable="true" ondragstart="dragStart(event)" id="item4">Item 4</div>
  </div>

  <script>
    let draggedItem = null;
    
    function dragStart(e) {
      draggedItem = e.target;
      e.dataTransfer.setData('text/plain', e.target.id);
      e.target.style.opacity = '0.4';
      
      // Set the drag effect
      e.dataTransfer.effectAllowed = 'move';
    }
    
    // Setup event listeners for all containers
    document.querySelectorAll('.container').forEach(container => {
      container.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        // Highlight the container
        e.currentTarget.style.backgroundColor = '#e9d5ff';
        
        // Find the element after which to insert
        const afterElement = getDragAfterElement(e.currentTarget, e.clientY);
        if (afterElement) {
          afterElement.parentNode.insertBefore(draggedItem, afterElement);
        } else {
          e.currentTarget.appendChild(draggedItem);
        }
      });
      
      container.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = '';
      });
      
      container.addEventListener('drop', (e) => {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = '';
        draggedItem.style.opacity = '1';
      });
    });
    
    function getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll('.item:not(.dragging)')];
      
      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
  </script>
</body>
</html>`)}
                                        className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                                    >
                                        <FaPlay size={12} /> Try it
                                    </button>
                                    <button
                                        onClick={() => copyToClipboard(`<div class="container">
  <h3>Container 1</h3>
  <div class="item" draggable="true" ondragstart="dragStart(event)" id="item1">Item 1</div>
  <div class="item" draggable="true" ondragstart="dragStart(event)" id="item2">Item 2</div>
</div>

<div class="container">
  <h3>Container 2</h3>
  <div class="item" draggable="true" ondragstart="dragStart(event)" id="item3">Item 3</div>
  <div class="item" draggable="true" ondragstart="dragStart(event)" id="item4">Item 4</div>
</div>

<script>
  let draggedItem = null;
  
  function dragStart(e) {
    draggedItem = e.target;
    e.dataTransfer.setData('text/plain', e.target.id);
    e.target.style.opacity = '0.4';
    
    // Set the drag effect
    e.dataTransfer.effectAllowed = 'move';
  }
  
  // Setup event listeners for all containers
  document.querySelectorAll('.container').forEach(container => {
    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      
      // Highlight the container
      e.currentTarget.style.backgroundColor = '#e9d5ff';
      
      // Find the element after which to insert
      const afterElement = getDragAfterElement(e.currentTarget, e.clientY);
      if (afterElement) {
        afterElement.parentNode.insertBefore(draggedItem, afterElement);
      } else {
        e.currentTarget.appendChild(draggedItem);
      }
    });
    
    container.addEventListener('dragleave', (e) => {
      e.preventDefault();
      e.currentTarget.style.backgroundColor = '';
    });
    
    container.addEventListener('drop', (e) => {
      e.preventDefault();
      e.currentTarget.style.backgroundColor = '';
      draggedItem.style.opacity = '1';
    });
  });
  
  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.item:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
</script>`, "between containers")}
                                        className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                                    >
                                        {copied === "between containers" ? (
                                            <>
                                                <FaCheck className="text-green-500" /> Copied!
                                            </>
                                        ) : (
                                            <>
                                                <FaCopy /> Copy Code
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Example 3: Drag and Drop with Data Transfer */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="p-4 bg-white dark:bg-gray-800">
                                <h3 className="font-bold text-lg mb-2">3. Complex Data Transfer</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Transfer complex data between draggable elements using the DataTransfer API.
                                </p>

                                <DataTransferPreview />
                                <div className="flex gap-2 mb-2">
                                    <button
                                        onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Complex Data Transfer</title>
  <style>
    .product {
      width: 150px;
      padding: 15px;
      margin: 10px;
      border: 1px solid #ddd;
      border-radius: 8px;
      cursor: move;
      display: inline-block;
    }
    .product h3 {
      margin: 0 0 5px 0;
      color: #4f46e5;
    }
    .product p {
      margin: 0;
      font-weight: bold;
    }
    #cart {
      width: 300px;
      min-height: 200px;
      border: 2px dashed #8b5cf6;
      border-radius: 8px;
      padding: 15px;
      margin-top: 20px;
    }
    .cart-item {
      padding: 5px;
      margin: 5px 0;
      background: #f3f4f6;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="product" draggable="true" ondragstart="dragStart(event)" 
       data-id="123" data-name="Product A" data-price="19.99">
    <h3>Product A</h3>
    <p>$19.99</p>
  </div>

  <div class="product" draggable="true" ondragstart="dragStart(event)" 
       data-id="456" data-name="Product B" data-price="29.99">
    <h3>Product B</h3>
    <p>$29.99</p>
  </div>

  <div id="cart" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h2>Shopping Cart</h2>
    <div id="cart-items"></div>
    <p>Total: $<span id="total">0.00</span></p>
  </div>

  <script>
    let total = 0;
    
    function dragStart(e) {
      // Store all product data
      const product = {
        id: e.target.dataset.id,
        name: e.target.dataset.name,
        price: parseFloat(e.target.dataset.price)
      };
      
      // Set custom drag image
      const dragImg = document.createElement('div');
      dragImg.textContent = product.name;
      dragImg.style.padding = '5px 10px';
      dragImg.style.background = '#4f46e5';
      dragImg.style.color = 'white';
      dragImg.style.borderRadius = '4px';
      document.body.appendChild(dragImg);
      dragImg.style.position = 'absolute';
      dragImg.style.left = '-9999px';
      e.dataTransfer.setDragImage(dragImg, 0, 0);
      setTimeout(() => document.body.removeChild(dragImg), 0);
      
      // Store data in multiple formats
      e.dataTransfer.setData('text/plain', product.id);
      e.dataTransfer.setData('application/json', JSON.stringify(product));
      e.dataTransfer.effectAllowed = 'copy';
    }
    
    function allowDrop(e) {
      e.preventDefault();
    }
    
    function drop(e) {
      e.preventDefault();
      
      // Get the product data
      const productData = e.dataTransfer.getData('application/json');
      if (!productData) return;
      
      const product = JSON.parse(productData);
      
      // Add to cart
      const cartItems = document.getElementById('cart-items');
      const item = document.createElement('div');
      item.className = 'cart-item';
      item.innerHTML = \`\${product.name} - \$\${product.price.toFixed(2)}\`;
      cartItems.appendChild(item);
      
      // Update total
      total += product.price;
      document.getElementById('total').textContent = total.toFixed(2);
    }
  </script>
</body>
</html>`)}
                                        className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                                    >
                                        <FaPlay size={12} /> Try it
                                    </button>
                                    <button
                                        onClick={() => copyToClipboard(`<div class="product" draggable="true" ondragstart="dragStart(event)" 
     data-id="123" data-name="Product A" data-price="19.99">
  <h3>Product A</h3>
  <p>$19.99</p>
</div>

<div class="product" draggable="true" ondragstart="dragStart(event)" 
     data-id="456" data-name="Product B" data-price="29.99">
  <h3>Product B</h3>
  <p>$29.99</p>
</div>

<div id="cart" ondrop="drop(event)" ondragover="allowDrop(event)">
  <h2>Shopping Cart</h2>
  <div id="cart-items"></div>
  <p>Total: $<span id="total">0.00</span></p>
</div>

<script>
  let total = 0;
  
  function dragStart(e) {
    // Store all product data
    const product = {
      id: e.target.dataset.id,
      name: e.target.dataset.name,
      price: parseFloat(e.target.dataset.price)
    };
    
    // Set custom drag image
    const dragImg = document.createElement('div');
    dragImg.textContent = product.name;
    dragImg.style.padding = '5px 10px';
    dragImg.style.background = '#4f46e5';
    dragImg.style.color = 'white';
    dragImg.style.borderRadius = '4px';
    document.body.appendChild(dragImg);
    dragImg.style.position = 'absolute';
    dragImg.style.left = '-9999px';
    e.dataTransfer.setDragImage(dragImg, 0, 0);
    setTimeout(() => document.body.removeChild(dragImg), 0);
    
    // Store data in multiple formats
    e.dataTransfer.setData('text/plain', product.id);
    e.dataTransfer.setData('application/json', JSON.stringify(product));
    e.dataTransfer.effectAllowed = 'copy';
  }
  
  function allowDrop(e) {
    e.preventDefault();
  }
  
  function drop(e) {
    e.preventDefault();
    
    // Get the product data
    const productData = e.dataTransfer.getData('application/json');
    if (!productData) return;
    
    const product = JSON.parse(productData);
    
    // Add to cart
    const cartItems = document.getElementById('cart-items');
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.innerHTML = \`\${product.name} - \$\${product.price.toFixed(2)}\`;
    cartItems.appendChild(item);
    
    // Update total
    total += product.price;
    document.getElementById('total').textContent = total.toFixed(2);
  }
</script>`, "data transfer")}
                                        className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                                    >
                                        {copied === "data transfer" ? (
                                            <>
                                                <FaCheck className="text-green-500" /> Copied!
                                            </>
                                        ) : (
                                            <>
                                                <FaCopy /> Copy Code
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* API Reference */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Drag and Drop API Reference
                    </h2>
                    <button
                        onClick={() => toggleSection("reference")}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                        <FaChevronDown
                            className={`transition-transform ${expandedSections.reference ? "rotate-180" : ""}`}
                        />
                    </button>
                </div>

                {expandedSections.reference && (
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Event/Property
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Description
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                                                draggable="true"
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            HTML attribute to make an element draggable
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                                                ondragstart
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Fires when the user starts dragging an element
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                                                ondrag
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Fires while an element is being dragged
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                                                ondragend
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Fires when the user has finished dragging an element
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                                                ondragenter
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Fires when a dragged element enters a drop target
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                                                ondragover
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Fires when a dragged element is over a drop target (must prevent default to allow drop)
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                                                ondragleave
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Fires when a dragged element leaves a drop target
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                                                ondrop
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Fires when a dragged element is dropped on a target (must prevent default)
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                                                dataTransfer.setData()
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Sets the data to be transferred during the drag operation
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                                                dataTransfer.getData()
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Retrieves the dragged data
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                                                dataTransfer.setDragImage()
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Sets a custom image to be displayed during dragging
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                                                dataTransfer.effectAllowed
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Specifies the effect allowed for this drag operation (none, copy, copyLink, copyMove, link, linkMove, move, all, uninitialized)
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                                                dataTransfer.dropEffect
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Controls the feedback given during drag operations (none, copy, link, move)
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </section>

            {/* Best Practices */}
            <section className="mb-8 bg-green-50 dark:bg-gray-800 p-6 rounded-lg border border-green-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">Best Practices</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-bold text-lg mb-2">1. Provide Visual Feedback</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Change the appearance of draggable elements and drop targets during drag operations to provide clear visual feedback to users.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">2. Make Targets Large Enough</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Ensure drop targets are large enough to be easily targeted. Small drop zones can frustrate users.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">3. Support Keyboard Navigation</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            For accessibility, ensure your drag and drop functionality can also be operated via keyboard.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">4. Optimize Performance</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            For complex drag and drop interfaces, throttle or debounce frequent events like dragover to improve performance.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">5. Provide Fallbacks</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Not all users can or want to use drag and drop. Provide alternative ways to achieve the same functionality.
                        </p>
                    </div>
                </div>
            </section>

            {/* Conclusion */}
            <section className="bg-purple-50 dark:bg-gray-800 p-6 rounded-lg border border-purple-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-400">Conclusion</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                    The HTML5 Drag and Drop API provides powerful native functionality for creating interactive interfaces. With proper implementation and attention to user experience, you can create intuitive drag and drop features that enhance your applications.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link href="/compilers/html-editor" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                        Try HTML Editor
                    </Link>
                    <Link href="/tutorials/html" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                        More HTML Tutorials
                    </Link>
                </div>
            </section>
        </div>
    );
}