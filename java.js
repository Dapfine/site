document.addEventListener('DOMContentLoaded', function () {
    // ===========================
    // ГЛОБАЛЬНЫЕ ДАННЫЕ
    // ===========================
    const searchData = [
        { title: "Game of Thrones", url: "#", image: "###", category: "Озвучка" },
        { title: "Friends", url: "#", image: "###", category: "Озвучка" },
        { title: "Breaking Bad", url: "#", image: "###", category: "Озвучка" },
        { title: "The Kominsky Method", url: "#", image: "###", category: "Озвучка" },
        { title: "Stranger Things", url: "#", image: "###", category: "Субтитры" },
        { title: "The Crown", url: "#", image: "###", category: "Субтитры" },
        { title: "House of Cards", url: "#", image: "###", category: "Озвучка" },
        { title: "The Wire", url: "#", image: "###", category: "Озвучка" }
    ];

    const seriesDetails = {
        "Game of Thrones": {
            title: "Game of Thrones",
            description: "Эпическая фэнтези-драма о борьбе за Железный трон в вымышленном континенте Вестерос...",
            image: "image/Game of Throne.jpg",
            status: "Завершено",
            date: "2023-11-15",
            genre: "Фэнтези, Драма",
            platform: "HBO",
            type: "Озвучка",
            team: ["Дэвид Бениофф - Сценарист", "Д.Б. Вайс - Сценарист", "Джордж Р.Р. Мартин - Оригинальная книга"],
            voiceActors: ["Алексей Вертков - Тирион Ланнистер", "Максим Матвеев - Джон Сноу", "Елена Санаева - Серсея Ланнистер"]
        },
        "Friends": {
            title: "Friends",
            description: "Ситком о жизни шестерых друзей в Нью-Йорке...",
            image: "image/Friends.jpg",
            status: "Завершено",
            date: "2023-10-01",
            genre: "Ситком, Комедия",
            platform: "Netflix",
            type: "Озвучка",
            team: ["Марта Кауффман - Сценарист", "Дэвид Крэйн - Сценарист", "Кевин Брайт - Продюсер"],
            voiceActors: ["Александр Гаврилин - Росс", "Ирина Киреева - Рэйчел", "Евгений Гришковец - Чендлер"]
        },
        "Breaking Bad": {
            title: "Breaking Bad",
            description: "История учителя химии, который начинает производить наркотики...",
            image: "image/Breaking Bad.jpg",
            status: "Завершено",
            date: "2023-09-20",
            genre: "Криминал, Драма",
            platform: "AMC",
            type: "Озвучка",
            team: ["Винс Гиллиган - Создатель", "Питер Гулд - Сценарист", "Джонатан Бэнкс - Актер"],
            voiceActors: ["Алексей Бардуков - Уолтер Уайт", "Евгений Миронов - Джесси Пинкман", "Сергей Гармаш - Густаво Фринг"]
        },
        "The Kominsky Method": {
            title: "The Kominsky Method",
            description: "Комедия о стареющем актере и его агенте...",
            image: "image/The Kominsky Method.jpg",
            status: "В процессе",
            date: "2023-12-05",
            genre: "Комедия, Драма",
            platform: "Netflix",
            type: "Озвучка",
            team: ["Чак Лорре - Создатель", "Майкл Дуглас - Актер", "Алан Аркин - Актер"],
            voiceActors: ["Владимир Машков - Сэнди Комински", "Константин Хабенский - Норман", "Елена Лядова - Сара"]
        },
        "Stranger Things": {
            title: "Stranger Things",
            description: "Мистический сериал о группе детей...",
            image: "image/Stranger Things.jpg",
            status: "Завершено",
            date: "2023-08-10",
            genre: "Ужасы, Фантастика",
            platform: "Netflix",
            type: "Текст",
            team: ["Дафна и Мэттью Дэйер - Создатели", "Милли Бобби Браун - Актер", "Финн Вулфхард - Актер"],
            voiceActors: ["Субтитры: Анастасия Петрова", "Субтитры: Дмитрий Смирнов", "Субтитры: Екатерина Кузнецова"]
        },
        "The Crown": {
            title: "The Crown",
            description: "Историческая драма о правлении королевы Елизаветы II...",
            image: "image/The Crown.jpg",
            status: "В процессе",
            date: "2023-11-01",
            genre: "Историческая драма",
            platform: "Netflix",
            type: "Текст",
            team: ["Питер Морган - Создатель", "Клэр Фой - Актер", "Оливия Колман - Актер"],
            voiceActors: ["Субтитры: Анна Матисон", "Субтитры: Игорь Золотарев", "Субтитры: Мария Суворова"]
        }
    };

    // ===========================
    // ЭЛЕМЕНТЫ DOM
    // ===========================
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const librarySection = document.getElementById('library-section');
    const descriptionSection = document.getElementById('description-section');
    const backBtn = document.getElementById('back-btn');
    const libraryGrid = document.getElementById('library-grid');
    const sortDateSelect = document.getElementById('sort-date');
    const filterStatusSelect = document.getElementById('filter-status');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (!libraryGrid) return;

    const allCards = Array.from(document.querySelectorAll('.library-card'));

    // ===========================
    // ФОРМАТИРОВАНИЕ ДАТЫ
    // ===========================
    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // ===========================
    // ПОИСК
    // ===========================
    let searchTimeout;
    if (searchInput && searchResults) {
        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.style.transform = 'scale(1.05)';
            searchInput.parentElement.style.zIndex = '10';
            if (searchInput.value.trim().length >= 2) {
                performSearch(searchInput.value);
            }
        });

        searchInput.addEventListener('blur', () => {
            setTimeout(() => {
                searchInput.parentElement.style.transform = 'scale(1)';
                searchInput.parentElement.style.zIndex = 'auto';
            }, 300);
        });

        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const term = e.target.value.trim().toLowerCase();
            searchTimeout = setTimeout(() => {
                searchResults.style.display = term.length >= 2 ? 'block' : 'none';
                if (term.length >= 2) performSearch(term);
            }, 300);
        });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }

    function performSearch(query) {
        const results = searchData.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
        displaySearchResults(results);
    }

    function displaySearchResults(results) {
        const container = document.getElementById('search-results');
        container.innerHTML = '';
        if (results.length === 0) {
            container.style.display = 'none';
            return;
        }
        results.forEach(item => {
            const el = document.createElement('div');
            el.className = 'search-result-item';
            el.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="search-result-content">
                    <div class="search-result-title">${item.title}</div>
                    <div class="search-result-category">${item.category}</div>
                </div>
            `;
            el.addEventListener('click', () => {
                window.location.href = item.url;
                container.style.display = 'none';
                searchInput.value = '';
            });
            container.appendChild(el);
        });
    }

    // ===========================
    // НАВИГАЦИЯ
    // ===========================
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function () {
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    if (backBtn && librarySection && descriptionSection) {
        backBtn.addEventListener('click', () => {
            librarySection.classList.remove('hidden');
            descriptionSection.classList.add('hidden');
            window.scrollTo(0, 0);
        });
    }

    // ===========================
    // КАРТОЧКИ: ОБЩИЙ ОБРАБОТЧИК
    // ===========================
    libraryGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.library-card');
        if (card) {
            const title = card.dataset.title;
            showDescription(title);
        }
    });

    function showDescription(title) {
        const details = seriesDetails[title];
        if (!details) return;

        document.getElementById('description-image').src = details.image;
        document.getElementById('description-title').textContent = details.title;
        document.getElementById('description-status').textContent = details.status;
        document.getElementById('description-text').textContent = details.description;
        document.getElementById('description-genre').textContent = details.genre;
        document.getElementById('description-date').textContent = formatDate(details.date);
        document.getElementById('description-platform').textContent = details.platform;
        document.getElementById('description-type').textContent = details.type;

        const teamList = document.getElementById('description-team');
        if (teamList) {
            teamList.innerHTML = details.team.map(m => `<li>${m}</li>`).join('');
        }

        const voiceList = document.getElementById('description-voice-actors');
        if (voiceList) {
            voiceList.innerHTML = details.voiceActors.map(a => `<li>${a}</li>`).join('');
        }

        librarySection.classList.add('hidden');
        descriptionSection.classList.remove('hidden');
        window.scrollTo(0, 0);
    }

    // ===========================
    // ФИЛЬТРЫ И СОРТИРОВКА
    // ===========================
    function applyFilters() {
        const selectedStatus = filterStatusSelect?.value || 'all';
        const selectedType = document.querySelector('.filter-btn.active')?.dataset.type || 'all';

        const filtered = allCards.filter(card => {
            const statusMatch = selectedStatus === 'all' || card.dataset.status === selectedStatus;
            const typeMatch = selectedType === 'all' || card.dataset.type === selectedType;
            return statusMatch && typeMatch;
        });

        libraryGrid.innerHTML = '';

        if (filtered.length === 0) {
            libraryGrid.innerHTML = `
                <div class="no-results">
                    <h3>Ничего не найдено</h3>
                    <p>Попробуйте изменить фильтры</p>
                </div>
            `;
            return;
        }

        const sortValue = sortDateSelect?.value || 'newest';
        const sorted = [...filtered].sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return sortValue === 'newest' ? dateB - dateA : dateA - dateB;
        });

        sorted.forEach(card => {
            const clone = card.cloneNode(true);
            libraryGrid.appendChild(clone);
        });
        // Обработчик кликов уже делегирован — не нужно добавлять повторно!
    }

    if (filterButtons.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                applyFilters();
            });
        });
    }

    sortDateSelect?.addEventListener('change', applyFilters);
    filterStatusSelect?.addEventListener('change', applyFilters);

    applyFilters(); // первоначальная фильтрация
});