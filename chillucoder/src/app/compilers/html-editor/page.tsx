"use client";

import HTMLEditor from '@/components/compilers/web/html/HTMLEditor';

const initialHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hi My Love ❤️</title>
  <style>
    body {
      background: linear-gradient(135deg, #ffecd2, #fcb69f);
      font-family: 'Segoe UI', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .card {
      background: white;
      padding: 2rem;
      border-radius: 1.5rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      text-align: center;
      max-width: 400px;
      width: 100%;
    }
    .btn {
      margin-top: 1.2rem;
      background: linear-gradient(to right, #ff758c, #ff7eb3);
      color: white;
      padding: 0.6rem 1.2rem;
      border: none;
      border-radius: 2rem;
      cursor: pointer;
      font-size: 1rem;
      font-weight: bold;
    }
    #msg3 {
      display: none;
      margin-top: 1rem;
      color: #d63384;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Hey <span style="color: #ff5c8a;">Sweetheart 💖</span></h1>
    <p>I just wanted to say... you're amazing, and I love you! 💕</p>
    <button class="btn" id="showBtn">Tap Me 😘</button>
    <p id="msg3">Aww! I knew you'd click. You're the cutest! 🥰</p>
  </div>

  <script>
    document.getElementById('showBtn').addEventListener('click', function () {
      document.getElementById('msg3').style.display = 'block';
    });
  </script>
</body>
</html>
`;

export default function HtmlEditorPage() {
  return <HTMLEditor htmlCode={initialHTML} />;
}