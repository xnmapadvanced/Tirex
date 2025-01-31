const token = 'YOUR_GITHUB_TOKEN'; // استبدل هذا بتوكن GitHub الخاص بك

// وظيفة لتسجيل الحساب
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // ارسال البيانات إلى GitHub باستخدام التوكن
    fetch('https://api.github.com/repos/your_username/your_repo/contents/accounts.txt', {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Create new account',
            content: btoa(username + ':' + password), // تشفير البيانات
            path: 'accounts.txt'
        })
    }).then(response => response.json()).then(data => {
        console.log(data);
    });
});

// وظيفة لتسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // التحقق من الحسابات
    fetch('https://api.github.com/repos/your_username/your_repo/contents/accounts.txt', {
        method: 'GET',
        headers: {
            'Authorization': `token ${token}`
        }
    }).then(response => response.json()).then(data => {
        const accounts = atob(data.content).split('\n');
        const accountFound = accounts.some(account => account === username + ':' + password);
        if (accountFound) {
            window.location.href = 'upload_product.html'; // اعادة التوجيه إلى صفحة رفع المنتج
        } else {
            alert('خطأ في البيانات');
        }
    });
});
