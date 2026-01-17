
import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Target, 
  TrendingUp, 
  Cpu, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  ChevronDown, 
  ShieldCheck, 
  Star,
  MessageCircle,
  Briefcase,
  Layers,
  Award,
  Lock,
  Globe,
  CreditCard,
  CircleDollarSign,
  RefreshCw,
  TrendingDown,
  HelpCircle,
  Package,
  Gift,
  DollarSign,
  Quote,
  X,
  Instagram,
  Send,
  Menu,
  Video,
  PhoneCall,
  Calendar
} from 'lucide-react';
import { Reveal } from './components/Reveal';
import { Feature, PricingPlan, FAQItem, ProgramModule } from './types';

// Ссылки на оплату для разных тарифов и способов
const paymentLinks: Record<string, { rub: string; eur: string; crypto: string }> = {
  "Самостоятельный": {
    rub: "https://t.me/tribute/app?startapp=sKT4",
    eur: "https://t.me/tribute/app?startapp=sKT5",
    crypto: "https://t.me/m/zmJlaKr0YzRi"
  },
  "Продвинутый": {
    rub: "https://t.me/tribute/app?startapp=sKSZ",
    eur: "https://t.me/tribute/app?startapp=sKT0",
    crypto: "https://t.me/m/A3z1vlHUZGYy"
  },
  "Менторство": {
    rub: "https://t.me/tribute/app?startapp=sKT7",
    eur: "https://t.me/tribute/app?startapp=sKT6",
    crypto: "https://t.me/m/t0yhGZSBMzA6"
  }
};

// --- Components ---

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'О курсе', href: '#about' },
    { name: 'Программа', href: '#program' },
    { name: 'Результаты', href: '#results' },
    { name: 'Тарифы', href: '#pricing' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        {/* Logo */}
        <a href="#" className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <Cpu className="text-white w-5 h-5" />
          </div>
          Ai<span className="text-orange-500">Model</span>Club
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-400">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-orange-500 transition-colors cursor-pointer">
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a href="#pricing" className="hidden sm:block px-4 md:px-6 py-2 md:py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xs md:text-sm font-semibold transition-all orange-glow whitespace-nowrap">
            Начать обучение
          </a>
          
          <button 
            onClick={toggleMenu}
            className="lg:hidden p-2 text-white hover:text-orange-500 transition-colors"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-[#0a0a0a] border-b border-white/10 lg:hidden p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-bold text-zinc-300 hover:text-orange-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#pricing" 
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center py-4 bg-orange-500 text-white rounded-xl font-bold orange-glow"
            >
              Начать обучение
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0, isExpired: false });

  useEffect(() => {
    // Таймер на 7 дней вперёд от текущей даты
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 5);
targetDate.setHours(23, 59, 59, 0);
const targetTime = targetDate.getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((difference % (1000 * 60)) / 1000),
          isExpired: false
        });
      } else {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0, isExpired: true });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-3 md:gap-4">
        {[
          { label: 'ДНЕЙ', val: format(timeLeft.d), id: 'days' },
          { label: 'ЧАСОВ', val: format(timeLeft.h), id: 'hours' },
          { label: 'МИНУТ', val: format(timeLeft.m), id: 'minutes' },
          { label: 'СЕКУНД', val: format(timeLeft.s), id: 'seconds' }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div 
              id={item.id}
              className={`w-14 h-14 md:w-16 md:h-16 glass rounded-xl flex items-center justify-center text-xl md:text-2xl font-bold timer-digit border transition-colors ${timeLeft.isExpired ? 'border-red-500/30 text-zinc-600' : 'border-white/10'}`}
            >
              {item.val}
            </div>
            <span className="text-[9px] md:text-[10px] uppercase tracking-wider mt-2 text-zinc-500 font-bold">{item.label}</span>
          </div>
        ))}
      </div>
      {timeLeft.isExpired && (
        <div className="mt-4 text-orange-500 font-bold animate-pulse uppercase tracking-widest text-sm">
          Продажи закрыты
        </div>
      )}
    </div>
  );
};

const Hero = () => (
  <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col items-center justify-center text-center px-6">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden opacity-20 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-600/30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>
    </div>
    
    <Reveal>
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-orange-500/30 text-orange-500 text-xs font-bold uppercase tracking-widest mb-6">
        <Zap className="w-3.5 h-3.5 fill-current" />
        ОГРАНИЧЕННЫЙ НАБОР — ОСТАЛОСЬ 5 ДНЕЙ
      </div>
    </Reveal>

    <Reveal delay={50}>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <span className="flex items-center gap-2 text-xs font-bold text-zinc-400 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
          <Lock size={14} className="text-orange-500" /> Анонимно
        </span>
        <span className="flex items-center gap-2 text-xs font-bold text-zinc-400 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
          <Globe size={14} className="text-orange-500" /> Из любой точки мира
        </span>
        <span className="flex items-center gap-2 text-xs font-bold text-zinc-400 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
          <CreditCard size={14} className="text-orange-500" /> Без вложений на старт
        </span>
      </div>
    </Reveal>
    
    <Reveal delay={100}>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.1] max-w-5xl tracking-tight">
        Запусти свою <span className="text-orange-500">AI-модель</span> и выходи на доход <span className="text-orange-500">$3,000–$10,000/мес</span>
      </h1>
    </Reveal>
    
    <Reveal delay={200}>
      <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mb-12 leading-relaxed">
        Пошаговая система от практика с доходом $10,000+/мес, которая работает даже если ты никогда не работал с нейросетями
      </p>
    </Reveal>

    <Reveal delay={300} className="flex flex-col items-center">
      <a href="#pricing" className="group px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-lg font-bold transition-all orange-glow flex items-center gap-3 mb-4">
        Забронировать место →
      </a>
      <p className="text-zinc-500 text-sm font-medium mb-6">
        ⚡ Осталось 8/22 мест • До закрытия продаж 5 дней
      </p>
      <Timer />
    </Reveal>
  </section>
);

const FreeLesson = () => (
  <section className="py-24 px-6 bg-[#111111]/30">
    <div className="max-w-5xl mx-auto text-center">
      <Reveal>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-orange-500/30 text-orange-500 text-xs font-bold uppercase tracking-widest mb-6">
          <Gift className="w-3.5 h-3.5 fill-current" />
          БЕСПЛАТНО
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          Начни с <span className="text-orange-500">бесплатного</span> урока
        </h2>
        <p className="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto">
          13 минут, которые покажут тебе как устроен этот бизнес изнутри
        </p>
        <p className="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto">
          Видео находится на Youtube, поэтому включи VPN, чтобы оно отображалось
        </p>
      </Reveal>
      
      <Reveal delay={100}>
        <div 
          className="video-container shadow-[0_0_50px_rgba(249,115,22,0.15)] group"
          style={{ 
            position: 'relative', 
            paddingBottom: '56.25%', 
            height: 0, 
            overflow: 'hidden', 
            maxWidth: '900px', 
            margin: '0 auto', 
            borderRadius: '12px' 
          }}
        >
          <iframe 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              borderRadius: '12px' 
            }}
            src="https://www.youtube.com/embed/LUMa2xRO1Lk?rel=0&modestbranding=1" 
            title="Бесплатный урок Neural Daddy" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <noscript>
            <a href="https://www.youtube.com/watch?v=LUMa2xRO1Lk" target="_blank" rel="noopener noreferrer">
              <img src="https://img.youtube.com/vi/LUMa2xRO1Lk/maxresdefault.jpg" alt="Смотреть видео" />
            </a>
          </noscript>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          {[
            "Без воды — только практика",
            "Реальные примеры заработка",
            "Пошаговый разбор ниши"
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-center gap-3 text-zinc-300 font-medium">
              <CheckCircle className="text-orange-500 w-5 h-5 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

const PainPoints = () => {
  const pains = [
    { 
      title: "Купил курс — результата нет", 
      desc: "Создал AI-модель по урокам из интернета, но не понимаешь как привлечь подписчиков и начать зарабатывать",
      icon: <CircleDollarSign className="text-orange-500 w-6 h-6" />
    },
    { 
      title: "Тратишь время впустую", 
      desc: "Пытаешься разобраться сам, тестируешь разные подходы месяцами, пока другие уже выходят на доход",
      icon: <RefreshCw className="text-orange-500 w-6 h-6" />
    },
    { 
      title: "Не понимаешь как растут другие", 
      desc: "Смотришь на успешные аккаунты с тысячами подписчиков и не можешь понять, что они делают по-другому",
      icon: <TrendingDown className="text-orange-500 w-6 h-6" />
    },
    { 
      title: "Сомнения останавливают", 
      desc: "\"Слишком много конкуренции\", \"Это сложно\", \"Наверное у меня не получится\" — знакомые мысли?",
      icon: <HelpCircle className="text-orange-500 w-6 h-6" />
    }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <Reveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 italic">Узнаёшь себя?</h2>
        </div>
      </Reveal>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {pains.map((pain, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="p-8 h-full glass rounded-2xl hover:bg-[#1a1a1a] transition-all border border-white/5 group hover:border-orange-500/20">
              <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {pain.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{pain.title}</h3>
              <p className="text-[#a1a1aa] leading-relaxed">{pain.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={400}>
        <div className="text-center text-zinc-500 italic text-xl">
          "Я прошёл через всё это сам. И создал систему, которая работает."
        </div>
      </Reveal>
    </section>
  );
};

const Expert = () => (
  <section id="about" className="py-24 px-6 bg-[#111111]/50">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <Reveal className="relative">
        <div className="aspect-square rounded-3xl overflow-hidden glass border border-white/10 relative">
          <img 
            src="https://i.ibb.co/WCj8XBF/a06aba33-nano-4-K.jpg?q=80&w=2000&auto=format&fit=crop" 
            alt="Expert" 
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-8 left-8">
            <div className="text-2xl font-bold text-white">Neural Daddy</div>
            <div className="text-orange-500 font-medium">Founder & Mentor</div>
          </div>
        </div>
        <div className="absolute -top-6 -right-6 w-32 h-32 glass rounded-2xl flex flex-col items-center justify-center border border-orange-500/20 orange-glow text-center px-2">
          <div className="text-2xl font-bold text-orange-500">$10K+</div>
          <div className="text-[10px] uppercase font-bold text-zinc-400">в месяц</div>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="inline-block px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase mb-6">
          КТО ВЕДЁТ ОБУЧЕНИЕ
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
          Практик, <span className="text-orange-500 font-black">не теоретик</span>
        </h2>
        <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
          Я изучил эту нишу методом проб и ошибок. Протестировал десятки подходов, слил бюджеты на рекламу, которая не работает, и в итоге выстроил систему, которая приносит стабильный результат.
        </p>
        <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
          Теперь я упаковал весь свой опыт в пошаговую программу, чтобы ты прошёл этот путь за недели, а не за год.
        </p>
        <div className="space-y-4">
          {[
            "$10,000+/мес — текущий стабильный доход на AI-моделях",
            "3 успешные модели в управлении",
            "1 год в нише — начинал с полного нуля",
            "20 учеников уже обучено по этой системе"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle className="text-orange-500 w-5 h-5 shrink-0" />
              <span className="text-zinc-300 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

const USP = () => {
  const cards = [
    { 
      icon: <Target />, 
      title: "Фокус на монетизацию", 
      text: "Большинство курсов учат создавать модель. Моя система учит зарабатывать на ней. 80% программы — это трафик, продажи и масштабирование." 
    },
    { 
      icon: <Globe />, 
      title: "Доступ к рынку USA", 
      text: "Подробные инструкции по настройке VPN, американских аккаунтов и работе с платёжеспособной западной аудиторией." 
    },
    { 
      icon: <Package />, 
      title: "Всё включено", 
      text: "500+ промптов, 50 скриптов продаж, контент-план на 30 дней, чек-листы. Не нужно ничего искать самому — бери и применяй." 
    }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <Reveal>
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Почему эта система <span className="text-orange-500">работает</span>
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="p-8 glass rounded-2xl h-full border border-white/5 group hover:border-orange-500/30 transition-all flex flex-col">
              <div className="w-14 h-14 bg-zinc-800 rounded-xl flex items-center justify-center shrink-0 mb-6 group-hover:scale-110 transition-transform">
                <div className="text-orange-500">
                  {React.cloneElement(card.icon as React.ReactElement, { size: 28 })}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
              <p className="text-[#a1a1aa] leading-relaxed">{card.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

const Program = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const modules = [
    { 
      id: "00", 
      title: "Старт и подготовка", 
      content: ["Обзор программы и стратегия прохождения", "Список необходимых инструментов и регистраций", "Первичная настройка VPN", "Создание необходимых аккаунтов"] 
    },
    { 
      id: "01", 
      title: "Создание уникальной AI-модели", 
      content: ["Поиск референсов реальных моделей", "Генерация уникального лица через текстовые промпты", "Технология FaceSwap", "Работа с первыми нейросетями", "Создание фотосессий"] 
    },
    { 
      id: "02", 
      title: "Генерация видео", 
      content: ["Введение в AI-видео", "Работа с нейросетями для видео", "Создание видео для Reels/TikTok", "Создание премиум видео для продаж"] 
    },
    { 
      id: "03", 
      title: "Площадки для монетизации", 
      content: ["Обзор платформ монетизации", "Создание и настройка Telegram-канала", "Западная платформа для AI-моделей", "Instagram как воронка трафика", "TikTok — генератор вирусного трафика"] 
    },
    { 
      id: "04", 
      title: "NSFW-контент", 
      content: ["Психология покупателей премиум-контента", "Создание откровенного контента и Implied Nude", "Storytelling и сценарии для продаж", "Создание тематических сетов", "Работа с кастомными заказами"] 
    },
    { 
      id: "05", 
      title: "Трафик USA", 
      content: ["Настройка VPN и американской личности", "Instagram для USA-аудитории", "TikTok — захват американского рынка", "Хеги и алгоритмы для USA", "Конвертация трафика в деньги"] 
    },
    { 
      id: "06", 
      title: "Продажи и коммуникация", 
      content: ["Психология покупателя Adult-контента", "Структура продающего диалога", "Готовые скрипты для продаж", "Работа с возражениями", "Допродажи и удержание"] 
    },
    { 
      id: "07", 
      title: "Масштабирование", 
      content: ["Построение команды", "Где искать и как нанимать ассистентов", "Собеседование и обучение персонала", "Автоматизация процессов", "Масштабирование до нескольких моделей"] 
    },
    { 
      id: "🎁", 
      isBonus: true, 
      title: "Бонусные материалы", 
      content: ["500+ работающих промптов для генерации", "База из 50 скриптов продаж на английском", "Excel-калькулятор доходности проекта", "Контент-план на 30 дней", "Чек-листы для каждого этапа", "Таблица ценообразования для разных рынков"] 
    }
  ];

  return (
    <section id="program" className="py-24 px-6 bg-[#111111]/30">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Программа <span className="text-orange-500">обучения</span></h2>
            <p className="text-zinc-400 text-lg">7 разделов + бонусные материалы, которые проведут тебя от нуля до стабильного дохода</p>
          </div>
        </Reveal>

        <div className="space-y-4">
          {modules.map((m, i) => (
            <Reveal key={i} delay={i * 30}>
              <div className={`glass rounded-2xl overflow-hidden border transition-all duration-300 ${openIndex === i ? 'border-orange-500/30' : 'border-white/5'}`}>
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-5">
                    <span className={`font-bold text-2xl transition-colors duration-300 ${openIndex === i ? 'text-orange-500' : 'text-orange-500/60'}`}>
                      {m.id}
                    </span>
                    <span className={`text-lg md:text-xl font-bold transition-colors ${openIndex === i ? 'text-white' : 'text-zinc-400'}`}>
                      {m.title}
                    </span>
                  </div>
                  <ChevronDown className={`transition-transform duration-500 ${openIndex === i ? 'rotate-180 text-orange-500' : 'text-zinc-500'}`} />
                </button>
                <div 
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === i ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-10 pb-8 pt-2 space-y-4">
                    <div className="h-px w-full bg-white/5 mb-6" />
                    {m.content.map((item, j) => (
                      <div key={j} className="flex items-start gap-4 text-zinc-400">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2.5 shrink-0" />
                        <span className="text-base md:text-lg leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Cases = () => {
  const casesData = [
    {
      icon: <CircleDollarSign size={24} />,
      val: "$200",
      sub: "за один день",
      desc: "Спустя 3 недели после старта обучения. До курса создал модель, но не понимал как на ней заработать.",
      sig: "Ученик, 3 недели в программе"
    },
    {
      icon: <TrendingUp size={24} />,
      val: "+1,900",
      sub: "целевых подписчиков",
      desc: "Через 3 дня после применения стратегии из раздела по трафику. Результат превзошёл все ожидания.",
      sig: "Ученик, 1 неделя в программе"
    },
    {
      icon: <DollarSign size={24} />,
      val: "$1,500/мес",
      sub: "на автопилоте",
      desc: "Спустя 2 месяца работы. Выстроил систему, нанял ассистента по инструкциям из раздела масштабирования.",
      sig: "Ученик, 2 месяца в программе"
    },
    {
      icon: <Zap size={24} />,
      val: "5 дней",
      sub: "до первой продажи",
      desc: "Полный новичок в нейросетях. Следовал пошаговым инструкциям — и уже на 5-й день получил первый платёж.",
      sig: "Ученик, новичок"
    },
    {
      icon: <Globe size={24} />,
      val: "$3,000/мес",
      sub: "из СНГ на рынке USA",
      desc: "Работает удалённо из России. Думал, что принимать оплату невозможно — всё решилось за пару часов настройки.",
      sig: "Ученик, 3 месяца в программе"
    },
    {
      icon: <Target size={24} />,
      val: "$50",
      sub: "первый кастомный заказ",
      desc: "Через 10 дней после старта. Следовал скриптам из раздела продаж — клиент сам попросил сделать кастомный сет.",
      sig: "Ученик, 2 недели в программе"
    }
  ];

  return (
    <section id="results" className="py-24 px-6 max-w-7xl mx-auto">
      <Reveal>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Результаты <span className="text-orange-500">учеников</span></h2>
          <p className="text-zinc-400 text-lg">Реальные результаты тех, кто уже прошёл обучение</p>
        </div>
      </Reveal>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {casesData.map((item, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="group bg-[#1a1a1a] rounded-3xl p-8 border border-white/5 hover:border-orange-500/20 transition-all duration-300 flex flex-col h-full hover:shadow-[0_0_30px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="text-4xl font-black text-orange-500 mb-1">{item.val}</div>
              <div className="text-xl font-bold text-white mb-4 leading-tight">{item.sub}</div>
              <p className="text-[#a1a1aa] leading-relaxed mb-8 flex-grow">{item.desc}</p>
              <div className="text-xs text-zinc-600 font-semibold uppercase tracking-wider mt-auto">{item.sig}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

const Reviews = () => {
  const reviewsData = [
    { text: "Вообще начинал пробовать ещё до покупки курса, собирал инфу у разных блогеров. Но здесь всё максимально детально — дало немало полезной инфы. Было 300 подписчиков, сейчас +1900 с начала покупки курса. 3 дня получается.", sig: "Ученик курса • Результат за 3 дня" },
    { text: "Это лучшее обучение, которое я покупал за последнее время. Столько информации, поэтапно, структурировано и понятно — просто невозможно что-то не понять. Дошёл до 4-го дня включительно, всё понятно. Очень благодарен!", sig: "Ученик курса • Тариф Продвинутый" },
    { text: "Хотел глубже разобраться в нейронках, прошёл уже большую часть и впечатлён объөмом материала! За такую цену честно не ожидал получить настолько детальный разбор. Всё разложено по полочкам, каждый день новый блок информации.", sig: "Arkadiy • Тариф Продвинутый" },
    { text: "Взял обучение в самом начале, прошёл 7 дней обучения — уже продал первую подписку. Особенно зацепило то, что в обучении не просто теория, а каждый шаг разжёван. У меня вообще не было опыта с нейронками, но благодаря такой подаче научился с ними работать.", sig: "Ученик курса • Первая продажа за 7 дней" },
    { text: "Брал платный курс по ИИ моделям — не пожалел от слова совсем. Всё настолько подробно расписано, что справится даже ребёнок. Рекомендую 100%", sig: "Ученик курса" },
    { text: "Сделку провели без гаранта, всё доходчиво объясняет, предлагает альтернативные решения если возникают проблемы. Всегда на связи — рекомендую однозначно!", sig: "Владислав • Тариф Продвинутый" }
  ];

  return (
    <section className="py-24 px-6 bg-[#111111]/20">
      <Reveal>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Отзывы <span className="text-orange-500">учеников</span></h2>
          <p className="text-zinc-400 text-lg">Реальные отзывы из Telegram</p>
        </div>
      </Reveal>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviewsData.map((item, i) => (
          <Reveal key={i} delay={i * 50}>
            <div className="group bg-[#1a1a1a] p-8 rounded-3xl border border-[#2a2a2a] h-full flex flex-col hover:border-orange-500/30 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-4 left-4 opacity-10 text-orange-500 pointer-events-none">
                <Quote size={48} fill="currentColor" />
              </div>
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-orange-500 fill-current" />)}
              </div>
              <p className="text-white text-lg leading-relaxed mb-8 relative z-10 font-medium italic">"{item.text}"</p>
              <div className="mt-auto text-xs text-[#a1a1aa] font-bold uppercase tracking-widest relative z-10">{item.sig}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const questions = [
    { question: "Это легально?", answer: "Да. AI-модели — это цифровой продукт. Ты создаёшь уникальный образ с помощью нейросетей и монетизируешь контент. Это легальный онлайн-бизнес, который не нарушает законы." },
    { question: "Нужны ли вложения для старта?", answer: "Минимальные. Тебе понадобится подписка на нейросети (~$10/мес) и VPN (~$5/мес). Это окупается с первых продаж — обычно в течение 2-4 недель." },
    { question: "Как принимать деньги, если я из СНГ?", answer: "В курсе подробно разобраны все способы: криптовалюта, иностранные карты, платёжные системы. Настройка занимает пару часов, всё показано пошагово." },
    { question: "Слишком много конкуренции...", answer: "Конкуренция есть везде. Но 90% делают ошибки, которые ты избежишь благодаря системе. Рынок огромный — места хватит всем, кто делает правильно. Мои ученики получают результаты именно потому, что знают как выделиться." },
    { question: "Получится ли у меня без опыта?", answer: "Система создана для новичков. Пошаговые инструкции со скриншотами и видео. Если умеешь пользоваться телефоном и компьютером — справишься. 80% моих учеников начинали с нуля." },
    { question: "Сколько времени нужно уделять?", answer: "На старте 2-3 часа в день для прохождения уроков и внедрения. После выстраивания системы — 1-2 часа на поддержание. Можно автоматизировать и делегировать ассистенту." },
    { question: "Когда будут первые результаты?", answer: "Первых подписчиков можно получить уже в первую неделю. Первые продажи — в течение 2-4 недель при активной работе. Некоторые ученики делают первую продажу уже на 5-7 день." }
  ];

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <Reveal>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Частые <span className="text-orange-500">вопросы</span></h2>
        </div>
      </Reveal>
      <div className="space-y-2">
        {questions.map((q, i) => (
          <div key={i} className="border-b border-white/5 last:border-0">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full py-6 flex items-center justify-between text-left group"
            >
              <span className={`text-xl font-bold transition-colors ${openIndex === i ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                {q.question}
              </span>
              <ChevronDown className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-orange-500' : 'text-zinc-500'}`} />
            </button>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === i ? 'max-h-96 opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
              <p className="text-[#a1a1aa] text-lg leading-relaxed">{q.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ConsultationSurvey = () => (
  <section className="py-24 px-6 max-w-4xl mx-auto text-center">
    <Reveal>
      <div className="p-12 glass rounded-[2.5rem] border border-orange-500/30 relative overflow-hidden bg-[#1a1a1a]">
        <div className="absolute -top-10 -right-10 p-4 opacity-[0.05] rotate-12 pointer-events-none">
          <PhoneCall size={240} className="text-orange-500" />
        </div>
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-orange-500/30 text-orange-500 text-xs font-bold uppercase tracking-widest mb-6">
          БЕСПЛАТНАЯ КОНСУЛЬТАЦИЯ
        </div>
        
        <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight">
          Не знаешь <span className="text-orange-500">какой тариф</span> выбрать?
        </h2>
        
        <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Заполни короткую анкету — я лично свяжусь с тобой, разберу твою ситуацию и помогу выбрать оптимальный формат обучения. Без давления и навязывания.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto">
          {[
            "Анкета на 2 минуты",
            "Личный созвон со мной",
            "Индивидуальные рекомендации",
            "Без обязательств к покупке"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-zinc-300 font-medium">
              <CheckCircle className="text-orange-500 w-5 h-5 shrink-0" />
              <span className="text-sm uppercase tracking-wider">{item}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <a 
            href="https://forms.gle/LPPHNkrJeSTaC87C6" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xl font-bold transition-all orange-glow flex items-center gap-3"
          >
            Заполнить анкету →
          </a>
          <p className="text-zinc-600 text-sm font-medium">
            Обычно отвечаю в течение 24 часов
          </p>
        </div>
      </div>
    </Reveal>
  </section>
);

// Модальное окно выбора способа оплаты
const PaymentModal = ({ 
  isOpen, 
  onClose, 
  planName 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  planName: string | null;
}) => {
  if (!isOpen || !planName) return null;

  const links = paymentLinks[planName];
  if (!links) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-[#1a1a1a] rounded-3xl border border-white/10 p-8 md:p-10 max-w-md w-full">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5 text-zinc-400" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-orange-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Выбери способ оплаты</h3>
          <p className="text-zinc-400">Тариф: <span className="text-orange-500 font-semibold">{planName}</span></p>
        </div>

        <div className="space-y-3">
          <a 
            href={links.rub}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 w-full p-4 bg-[#252525] hover:bg-[#2a2a2a] border border-white/5 hover:border-orange-500/30 rounded-xl transition-all group"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🇷🇺</span>
            </div>
            <div className="flex-grow text-left">
              <div className="text-white font-bold">Рубли (₽)</div>
              <div className="text-zinc-500 text-sm">Карты РФ, СБП</div>
            </div>
            <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-orange-500 transition-colors" />
          </a>

          <a 
            href={links.eur}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 w-full p-4 bg-[#252525] hover:bg-[#2a2a2a] border border-white/5 hover:border-orange-500/30 rounded-xl transition-all group"
          >
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🇪🇺</span>
            </div>
            <div className="flex-grow text-left">
              <div className="text-white font-bold">Евро (€)</div>
              <div className="text-zinc-500 text-sm">Иностранные карты</div>
            </div>
            <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-orange-500 transition-colors" />
          </a>

          <a 
            href={links.crypto}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 w-full p-4 bg-[#252525] hover:bg-[#2a2a2a] border border-white/5 hover:border-orange-500/30 rounded-xl transition-all group"
          >
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">₿</span>
            </div>
            <div className="flex-grow text-left">
              <div className="text-white font-bold">Криптовалюта</div>
              <div className="text-zinc-500 text-sm">USDT, BTC, ETH</div>
            </div>
            <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-orange-500 transition-colors" />
          </a>
        </div>

        <p className="text-center text-zinc-600 text-xs mt-6">
          🔒 Безопасная оплата через Telegram
        </p>
      </div>
    </div>
  );
};

const Pricing = ({ onSelectPlan }: { onSelectPlan: (name: string) => void }) => {
  const plans = [
    { 
      name: "Самостоятельный", 
      price: "$249", 
      priceRub: "≈ 20,000 ₽",
      badge: null,
      features: [
        { text: "Все 7 разделов обучения", included: true },
        { text: "Пошаговые видео-уроки", included: true },
        { text: "500+ промптов для генерации", included: true },
        { text: "50 скриптов продаж", included: true },
        { text: "Контент-план на 30 дней", included: true },
        { text: "Чек-листы для каждого этапа", included: true },
        { text: "Доступ к материалам навсегда", included: true },
        { text: "Обновления программы", included: false },
        { text: "Личная поддержка", included: false },
        { text: "Общий чат с учениками", included: false },
      ],
      cta: "Выбрать тариф",
      footer: "Доступен всегда",
      isPopular: false
    },
    { 
      name: "Продвинутый", 
      price: "$549", 
      priceRub: "≈ 49,000 ₽",
      badge: "ХИТ ПРОДАЖ",
      isPopular: true,
      features: [
        { text: "Всё из тарифа \"Самостоятельный\"", included: true },
        { text: "Постоянные обновления программы", included: true },
        { text: "Новые уроки и материалы бесплатно", included: true },
        { text: "Личная поддержка в Telegram", included: true },
        { text: "Ответы на вопросы в течение 24 часов", included: true },
        { text: "Созвоны по запросу при необходимости", included: true },
        { text: "Доступ в закрытый чат учеников", included: true },
        { text: "Нетворкинг и обмен опытом", included: true },
        { text: "Дополнительные материалы и кейсы", included: true },
        { text: "Приоритетный доступ к новым урокам", included: true },
        { text: "Доступ навсегда", included: true },
      ],
      cta: "Забронировать место →",
      footer: "⚡ Осталось 7/20 мест"
    },
    { 
      name: "Менторство", 
      price: "$1,499", 
      priceRub: "≈ 119,000 ₽",
      badge: "PREMIUM",
      isPopular: false,
      features: [
        { text: "Всё из тарифа \"Продвинутый\"", included: true },
        { text: "Личная работа со мной 1 на 1", included: true },
        { text: "Я сам инициирую созвоны и проверки", included: true },
        { text: "Персональный план запуска модели", included: true },
        { text: "Разбор твоей ситуации и стратегия", included: true },
        { text: "Еженедельные созвоны по прогрессу", included: true },
        { text: "Проверка и корректировка контента", included: true },
        { text: "Помощь с настройкой всех аккаунтов", included: true },
        { text: "Работаем вместе до первого результата", included: true },
        { text: "Приоритетная поддержка 24/7", included: true },
        { text: "Прямой доступ в личные сообщения", included: true },
        { text: "Доступ навсегда", included: true },
      ],
      cta: "Забронировать место →",
      footer: "⚡ Осталось 1/2 мест"
    }
  ];

  return (
    <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
      <Reveal>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Выбери свой <span className="text-orange-500">формат</span> обучения</h2>
          <p className="text-zinc-400 text-lg mb-2">Количество мест ограничено</p>
          <p className="text-orange-500 font-bold uppercase tracking-widest text-sm">
            ⚡ Осталось мест: Продвинутый — 11 | Менторство — 1
          </p>
        </div>
      </Reveal>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, i) => (
          <Reveal key={i} delay={i * 100} className="h-full">
            <div className={`h-full p-8 md:p-10 rounded-[2.5rem] border flex flex-col transition-all duration-500 ${plan.isPopular ? 'bg-[#1a1a1a] border-orange-500 relative orange-glow scale-105 z-10' : 'bg-[#111111] border-white/5 hover:border-white/10'}`}>
              {plan.badge && (
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-1.5 text-xs font-black rounded-full uppercase tracking-[0.2em] shadow-lg ${plan.badge === 'PREMIUM' ? 'bg-zinc-700 text-zinc-100' : 'bg-orange-500 text-white'}`}>
                  {plan.badge}
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">{plan.name}</h3>
                <div className="text-5xl font-black text-white mb-1">{plan.price}</div>
                <div className="text-sm text-zinc-500 font-medium">{plan.priceRub}</div>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((f, j) => (
                  <div key={j} className={`flex items-start gap-3 ${f.included ? 'text-zinc-300' : 'text-zinc-600 italic'}`}>
                    {f.included ? (
                      <CheckCircle className="text-orange-500 w-5 h-5 shrink-0 mt-0.5" />
                    ) : (
                      <X className="text-zinc-600 w-5 h-5 shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm leading-relaxed">{f.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <button 
                  onClick={() => onSelectPlan(plan.name)}
                  className={`w-full py-5 rounded-2xl font-black text-base uppercase tracking-wider transition-all duration-300 mb-4 ${plan.isPopular ? 'bg-orange-500 text-white hover:bg-orange-600 orange-glow' : 'border border-white/20 text-white hover:bg-white/5'}`}
                >
                  {plan.cta}
                </button>
                <div className={`text-center text-xs font-bold uppercase tracking-widest ${plan.footer.includes('⚡') ? 'text-orange-500 animate-pulse' : 'text-zinc-600'}`}>
                  {plan.footer}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

const Guarantee = () => (
  <section className="py-24 px-6 max-w-5xl mx-auto text-center">
    <Reveal>
      <div className="p-12 glass rounded-[2.5rem] border border-orange-500/30 relative overflow-hidden bg-[#111111]">
        <div className="absolute -top-10 -right-10 p-4 opacity-[0.03] rotate-12 pointer-events-none">
          <ShieldCheck size={280} className="text-orange-500" />
        </div>
        <div className="absolute -bottom-10 -left-10 p-4 opacity-[0.03] -rotate-12 pointer-events-none">
          <ShieldCheck size={280} className="text-orange-500" />
        </div>
        
        <ShieldCheck className="mx-auto text-orange-500 w-16 h-16 mb-8" />
        <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">Гарантия первого <span className="text-orange-500">результата</span></h2>
        
        <p className="text-white text-lg md:text-2xl font-medium mb-4 leading-relaxed max-w-3xl mx-auto">
          Если ты пройдёшь все модули, выполнишь задания и не получишь первых подписчиков в течение 30 дней — я лично разберу твою ситуацию на созвоне и дам индивидуальные рекомендации бесплатно.
        </p>
        
        <p className="text-zinc-500 text-sm md:text-base mb-12 max-w-2xl mx-auto italic">
          Распространяется на тарифы "Продвинутый" и "Менторство"
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/5">
          {[
            "Действует 30 дней после старта",
            "Личный разбор на созвоне",
            "Индивидуальные рекомендации"
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-center gap-3 text-zinc-300">
              <CheckCircle className="text-orange-500 w-5 h-5 shrink-0" />
              <span className="text-sm font-bold uppercase tracking-wider">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  </section>
);

const FinalCTA = () => (
  <section className="py-24 px-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-orange-600/10 -z-10"></div>
    <div className="max-w-4xl mx-auto text-center">
      <Reveal>
        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Начни <span className="text-orange-500">зарабатывать</span> на AI-моделях</h2>
        <p className="text-zinc-400 text-xl mb-12 leading-relaxed">
          Через месяц ты можешь остаться там же, где сейчас. Или уже получить первые деньги с AI-модели. Решение за тобой.
        </p>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <a href="#pricing" className="px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xl font-bold transition-all orange-glow flex items-center gap-3">
              Забронировать место →
            </a>
            <div className="flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-sm animate-pulse">
              ⚡ Осталось 8/22 мест
            </div>
          </div>
          <p className="text-zinc-500 text-sm font-medium mt-2">
            Количество мест ограничено
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

const Footer = () => (
  <footer id="footer" className="py-12 px-6 border-t border-white/5 glass">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="text-2xl font-bold text-white flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
          <Cpu className="text-white w-5 h-5" />
        </div>
        Ai<span className="text-orange-500">Model</span>Club
      </div>
      
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-zinc-500 font-medium">
        <a href="#about" className="hover:text-white hover:text-orange-500 transition-colors">О курсе</a>
        <a href="#program" className="hover:text-white hover:text-orange-500 transition-colors">Программа</a>
        <a href="#pricing" className="hover:text-white hover:text-orange-500 transition-colors">Тарифы</a>
        <a href="https://t.me/ofm_daddy" className="hover:text-white hover:text-orange-500 transition-colors">Контакты</a>
      </div>
      
      <div className="flex items-center gap-4">
        <a href="https://t.me/ofm_daddy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors group">
          <Send className="w-5 h-5 text-zinc-400 group-hover:text-white" />
        </a>
        <a href="https://instagram.com/neural_daddy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors group">
          <Instagram className="w-5 h-5 text-zinc-400 group-hover:text-white" />
        </a>
      </div>
    </div>
    <div className="text-center mt-12 text-zinc-600 text-xs">
      © 2025 Neural Daddy. Все права защищены.
    </div>
  </footer>
);

// --- Main App ---

const App: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    setIsPaymentModalOpen(true);
  };

  useEffect(() => {
    if (isPaymentModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isPaymentModalOpen]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FreeLesson />
      <PainPoints />
      <Expert />
      <USP />
      <Program />
      <Cases />
      <Reviews />
      <FAQ />
      <ConsultationSurvey />
      <Pricing onSelectPlan={handleSelectPlan} />
      <Guarantee />
      <FinalCTA />
      <Footer />
      
      {/* Payment Modal */}
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        planName={selectedPlan}
      />
      
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-orange-500 z-[100] transition-all duration-300"
        style={{ width: '0%', animation: 'scroll-watch linear both', animationTimeline: 'scroll()' }}
      />
      
      <style>{`
        @keyframes scroll-watch {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @media (max-width: 1023px) {
          .glass {
            backdrop-filter: blur(20px);
          }
        }
        
        iframe {
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
};

export default App;
