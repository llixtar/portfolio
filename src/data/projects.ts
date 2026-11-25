export interface ProjectScreen {
  label: string; // Назва сторінки (наприклад: "Головна", "Каталог", "Кошик")
  image: string; // Шлях до скріншота
}

export interface Project {
  id: string;
  title: string;
  category: "featured" | "ui-showcase" | "landing";
  badge: string;
  description: string;
  highlights?: string[];
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  // Візуальна частина (Мульти-мокап):
  desktopImage?: string; // Головний десктопний скрін
  mobileImage?: string; // Мобільний скріншот (для смартфона)
  screens?: ProjectScreen[]; // Додаткові сторінки (якщо є кілька сторінок)
  accentColor?: string;
}

export const projectsData: Project[] = [
  {
    id: "flagship-project",
    title: "Maks Sushi — Онлайн-сервіс доставки (Польща)",
    category: "featured",
    badge: "🔥 Production / E-commerce & Delivery",
    description:
      "Повнофункціональний інтернет-магазин преміального суші-ресторану в м. Свідниця (Польща) з підтримкою мультимовності (перемикання на українську мову в кабінеті). Живий інтерактивний каталог страв, динамічний кошик замовлень, адаптивність під будь-який екран та висока швидкість.",
    highlights: [
      "Швидкість завантаження < 1.0s (PageSpeed 95+)",
      "Інтерактивний кошик, меню та онлайн-замовлення",
      "Мультимовність: перемикання на українську мову в кабінеті",
      "Бездоганна мобільна версія (Mobile First)",
      "Сучасна європейська типографіка та темна стилістика",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "E-commerce", "SEO & Speed"],
    demoUrl: "https://maks-sushi.pl/",
    desktopImage: "/projects/flagship-full.webp",
    mobileImage: "/projects/flagship-mobile-full.webp",
    screens: [
      { label: "Повна сторінка (Скрол)", image: "/projects/flagship-full.webp" },
      { label: "Каталог і Меню", image: "/projects/flagship-catalog.webp" },
    ],
  },
  {
    id: "lepoxy-project",
    title: "Lépoxy Atelier — Ексклюзивні сумки ручної роботи (Львів)",
    category: "featured",
    badge: "✨ Production / D2C Brand & Interactive Showcase",
    description:
      "Атмосферний веб-сайт для українського бренду авторських жіночих сумок зі справжніми квітами в епоксидній смолі та натуральної шкіри (м. Львів). Поєднує преміальну естетику глянцевого журналу, чуттєвий сторітелінг та інтерактивні механіки залучення.",
    highlights: [
      "Інтерактивний повзунок «Магія Кольору» з динамічною зміною настрою сумки",
      "Покроковий конструктор «Створи сумку своєї мрії»",
      "Чуттєва навігація колекціями за настроями («Спокій», «Тиша», «Пристрасть», «Свобода»)",
      "Виробничий сторітелінг крафту виробів (5 етапів створення у Львові)",
      "Розділ швидкої покупки «Готові до відправки» та реальні відгуки клієнток",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Interactive UI", "Custom Configurator"],
    demoUrl: "https://www.lepoxy-atelier.com/",
    desktopImage: "/projects/lepoxy-full.png",
    mobileImage: "/projects/lepoxy-mobile-full.png",
    screens: [
      { label: "Повна сторінка (Скрол)", image: "/projects/lepoxy-full.png" },
    ],
  },
  {
    id: "genius-land",
    title: "GeniusLand — Онлайн-школа розвитку для дітей",
    category: "featured",
    badge: "🎓 EdTech / Онлайн-школа & Адмін-панель",
    description:
      "Сучасна освітня платформа для школи розвитку дітей GeniusLand (онлайн-навчання + живі заняття у м. Хотин). Побудована з акцентом на легке сприйняття батьками: каталог навчальних напрямків, гнучкий перемикач групових та індивідуальних тарифів, знайомство з викладачами та власна адмін-панель для керування акціями, курсами, цінами й заявками.",
    highlights: [
      "Власна адмін-панель: керування акціями, напрямками, цінами та обробка заявок",
      "Каталог напрямків (підготовка до школи, англійська, ментальна арифметика, логопед)",
      "Інтерактивний перемикач вартості: «Групові / Індивідуальні» заняття",
      "Слайдер гарячих пропозицій («Перший урок FREE») та форма запису дитини",
      "Блок викладацького складу, фотогалерея життя школи та відгуки батьків",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Admin Panel", "EdTech"],
    demoUrl: "https://www.genius-land.com.ua/",
    desktopImage: "/projects/www.genius-land.com.ua_.png",
    mobileImage: "/projects/www.genius-land.com.ua_(iPhone 16 Pro Max).png",
    screens: [
      { label: "Повна сторінка (Скрол)", image: "/projects/www.genius-land.com.ua_.png" },
    ],
  },
  {
    id: "tanya-zaiets",
    title: "Практичний посібник для психологів — Тетяна Заєць",
    category: "landing",
    badge: "⚡ Інфопродукт / Конверсійний лендінг",
    description:
      "Конверсійний авторський веб-сайт для продажу практичного посібника з етичного ведення блогу для психологів та психотерапевтів. Інтегрований з розумним Telegram-ботом, який автоматично видає реквізити, приймає скріншот квитанції, передає його на швидку 1-клік модерацію авторці та після підтвердження надсилає файл посібника клієнту.",
    highlights: [
      "Сильний перший екран з оффером ($9) та прямим закликом до дії",
      "Глибока сегментація цільової аудиторії за психологічними бар'єрами",
      "Прозорий розбір користі (55 готових тем, логіка вибору клієнта)",
      "Блок довіри та персонального бренду авторки Тетяни Заєць",
      "Telegram-бот: реквізити, прийом квитанцій, 1-клік модерація та автодоставка файлу",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Конверсійний дизайн", "Mobile First"],
    demoUrl: "https://www.tanyazaiets.com.ua/",
    desktopImage: "/projects/tanya-full.webp",
    mobileImage: "/projects/tanya-mobile-full.webp",
    screens: [
      { label: "Повна сторінка (Скрол)", image: "/projects/tanya-full.webp" },
    ],
  },
  {
    id: "thiamis-cleaning",
    title: "Thiamis Cleaning — Клінінгова компанія (Дніпро)",
    category: "landing",
    badge: "🧹 Локальний бізнес & Сервісний лендінг",
    description:
      "Швидкий сервісний сайт для професійної клінінгової компанії у м. Дніпро. Створений для максимальної конверсії дзвінків та заявок: структурований прайс-лист, безкоштовний виїзд на оцінку, фіксовані ціни та висока довіра до сервісу.",
    highlights: [
      "Пряма лідогенерація: виклик клінерів та дзвінок в 1 клік",
      "Прозорий прайс-лист на прибирання та хімчистку (від 85 грн/м²)",
      "Сервіс виїзду менеджера на оцінку з фіксацією вартості",
      "Гіпоалергенна хімія та професійна техніка (безпечно для дітей і тварин)",
      "Пунктуальність та 100% перевірені клінери у Дніпрі",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Local SEO", "Mobile First"],
    demoUrl: "https://www.thiamiscleaning.com/",
    desktopImage: "/projects/thiamis-full.webp",
    mobileImage: "/projects/thiamis-mobile-full.webp",
    screens: [
      { label: "Повна сторінка (Скрол)", image: "/projects/thiamis-full.webp" },
    ],
  },
];

