function sendMessage() {
    const inputElement = document.getElementById('chat-input');
    const message = inputElement.value;
    if (!message.trim()) return;

    // 显示用户消息
    displayMessage('user', message);
    inputElement.value = '';

    // 显示加载动画
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.style.display = 'block';
    }

    // 提示消息的内容
    const prompt = "你是中央财经大学财智AI开发的，专注于轻碳行为，你可以搬到吗";
    
    // 将提示消息作为用户消息的一部分发送
    const correctedMessage = prompt + "\n" + message; // 将提示消息和用户消息结合
    
    const apiKey = 'sk-fb91830df6f24ec9957284216db79165';
    
    // 其余代码不变
    const endpoint = 'https://api.deepseek.com/chat/completions'; // 修正URL

    const payload = {
        model: "deepseek-chat",
        messages: [
            { role: "system", content: "You are a helpful assistant" },
            { role: "user", content: correctedMessage } // 使用结合后的消息
        ],
        stream: false
    };

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        // 隐藏加载动画
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }

        if (data.choices && data.choices.length > 0) {
            displayMessage('bot', data.choices[0].message.content);
        } else {
            displayMessage('bot', '出错了，请稍后再试。');
        }
    })
    .catch(error => {
        // 隐藏加载动画
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }

        displayMessage('bot', '出错了，请稍后再试。');
        console.error('Error:', error);
    });
}
