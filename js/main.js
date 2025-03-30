document.addEventListener('DOMContentLoaded', () => {
    // Мобильное меню
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Корзина
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    function updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const totalAmount = document.getElementById('totalAmount');
        
        if (cartItems && totalAmount) {
            cartItems.innerHTML = '';
            let total = 0;
            
            cart.forEach((item, index) => {
                const div = document.createElement('div');
                div.className = 'cart-item';
                div.innerHTML = `
                    <span>${item.name}</span>
                    <span>${item.price} руб.</span>
                    <button onclick="removeFromCart(${index})">&times;</button>
                `;
                cartItems.appendChild(div);
                total += item.price;
            });
            
            totalAmount.textContent = total.toFixed(2);
        }
    }

    // Добавление в корзину
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const item = {
                name: button.dataset.name,
                price: parseFloat(button.dataset.price)
            };
            cart.push(item);
            updateCart();
            alert(`${item.name} добавлен в корзину!`);
        });
    });

    // Удаление из корзины
    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        updateCart();
    }

    // Бронирование
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            alert(`Спасибо! Ваш столик забронирован на ${formData.get('datetime')}. Мы позвоним вам для подтверждения.`);
            e.target.reset();
        });
    }

    // Оформление заказа
    window.showOrderModal = () => {
        if (cart.length === 0) {
            alert('Добавьте товары в корзину');
            return;
        }
        document.getElementById('orderModal').style.display = 'flex';
    }

    window.closeModal = () => {
        document.getElementById('orderModal').style.display = 'none';
    }

    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            alert(`Спасибо за заказ! Сумма: ${document.getElementById('totalAmount').textContent} руб. Наш менеджер свяжется с вами в ближайшее время.`);
            cart = [];
            updateCart();
            document.getElementById('orderModal').style.display = 'none';
            e.target.reset();
        });
    }

    // Обратная связь
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Спасибо за ваше сообщение! Мы ответим вам в течение 24 часов.');
            e.target.reset();
        });
    }

    // Подписка
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Спасибо за подписку! На ваш email отправлено письмо с подтверждением.');
            e.target.reset();
        });
    }

    // Категории меню
    const categoryBtns = document.querySelectorAll('.category-btn');
    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Удаляем активный класс у всех кнопок
                categoryBtns.forEach(b => b.classList.remove('active'));
                // Добавляем активный класс текущей кнопке
                btn.classList.add('active');
                
                // Скрываем все категории меню
                document.querySelectorAll('.menu-items').forEach(item => {
                    item.classList.add('hidden');
                });
                
                // Показываем выбранную категорию
                const category = btn.dataset.category;
                document.getElementById(category).classList.remove('hidden');
            });
        });
    }

    // Инициализация корзины при загрузке
    updateCartDisplay();
});