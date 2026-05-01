document.addEventListener('DOMContentLoaded', () => {
    // تعريف العناصر
    const useCodeBtn = document.getElementById('use-code-btn');
    const codeModal = document.getElementById('code-modal');
    const cancelModal = document.getElementById('cancel-modal');
    const codeInputs = document.querySelectorAll('.code-input');

    // الرمز الصحيح المطلوب
    const CORRECT_CODE = "2001"; 

    // فتح النافذة عند الضغط على الزر
    useCodeBtn.addEventListener('click', () => {
        codeModal.classList.add('active');
        codeInputs[0].focus(); // التركيز على أول مربع تلقائياً
    });

    // إغلاق النافذة
    const closeModal = () => {
        codeModal.classList.remove('active');
        // تفريغ المدخلات عند الإغلاق
        codeInputs.forEach(input => input.value = '');
    };

    cancelModal.addEventListener('click', closeModal);
    // إغلاق عند الضغط خارج النافذة
    codeModal.addEventListener('click', (e) => {
        if (e.target === codeModal) {
            closeModal();
        }
    });

    // منطق مربعات الرمز الأربعة
    codeInputs.forEach((input, index) => {
        // التحقق من الإدخال
        input.addEventListener('input', (e) => {
            // السماح بالأرقام فقط
            e.target.value = e.target.value.replace(/[^0-9]/g, '');

            // الانتقال تلقائياً للمربع التالي إذا تم إدخال رقم
            if (e.target.value.length === 1 && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }

            // التحقق من الرمز الكامل عند ملء المربعات الأربعة
            checkFullCode();
        });

        // التعامل مع مفتاح Backspace للرجوع للخلف
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
                codeInputs[index - 1].focus();
            }
        });
    });

    // دالة التحقق من الرمز النهائي
    function checkFullCode() {
        // تجميع الأرقام الأربعة
        let enteredCode = "";
        codeInputs.forEach(input => enteredCode += input.value);

        // إذا تم ملء الرمز بالكامل (4 أرقام)
        if (enteredCode.length === 4) {
            if (enteredCode === CORRECT_CODE) {
                // إذا كان الرمز صحيحاً: انتقال إلى صفحة واجهة التطبيق
                console.log("الرمز صحيح، يتم الانتقال...");
                // تأخير بسيط لإظهار الرقم الأخير قبل الانتقال
                setTimeout(() => {
                    window.location.href = 'dashboard.html'; 
                }, 500);
            } else {
                // إذا كان الرمز خطأ: تفريغ المربعات وإعطاء مؤشر خطأ
                console.log("الرمز خطأ، حاول مرة أخرى.");
                alert("الرمز غير صحيح، حاول مرة أخرى."); // يمكن استبدالها بتأثير بصري
                codeInputs.forEach(input => input.value = '');
                codeInputs[0].focus();
            }
        }
    }
});