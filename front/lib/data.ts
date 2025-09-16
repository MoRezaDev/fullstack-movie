export const subjectsData = [
  { title: "دانلود انیمیشن", views: 2437 },
  { title: "دانلود سریال", views: 2837 },
  { title: "دانلود فیلم", views: 15520 },
  { title: "دانلود مستند", views: 1287 },
  { title: "سریال ایرانی", views: 183 },
  { title: "فیلم اجتماعی", views: 1141 },
  { title: "فیلم اکشن", views: 4703 },
  { title: "فیلم ایرانی", views: 1604 },
  { title: "فیلم بیوگرافی", views: 874 },
  { title: "فیلم تاریخی", views: 971 },
  { title: "فیلم ترسناک", views: 2334 },
  { title: "فیلم جنایی", views: 2751 },
  { title: "فیلم جنگی", views: 499 },
  { title: "فیلم خانوادگی", views: 2027 },
  { title: "فیلم درام", views: 8794 },
  { title: "فیلم عاشقانه", views: 1433 },
  { title: "فیلم علمی تخیلی", views: 1417 },
  { title: "فیلم فانتزی", views: 1631 },
  { title: "فیلم کمدی", views: 4442 },
  { title: "فیلم ماجراجویی", views: 3349 },
  { title: "فیلم معمایی", views: 2269 },
  { title: "فیلم هیجانی", views: 4668 },
];

export const weekendData = [
  {
    en: "saturday",
    fa: "شنبه",
    link() {
      return `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/content/day?q=${this.en}`;
    },
  },
  {
    en: "sunday",
    fa: "یکشنبه",
    link() {
      return `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/content/day?q=${this.en}`;
    },
  },
  {
    en: "monday",
    fa: "دوشنبه",
    link() {
      return `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/content/day?q=${this.en}`;
    },
  },
  {
    en: "tuesday",
    fa: "سه‌شنبه",
    link() {
      return `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/content/day?q=${this.en}`;
    },
  },
  {
    en: "wednesday",
    fa: "چهارشنبه",
    link() {
      return `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/content/day?q=${this.en}`;
    },
  },
  {
    en: "thursday",
    fa: "پنج‌شنبه",
    link() {
      return `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/content/day?q=${this.en}`;
    },
  },
  {
    en: "friday",
    fa: "جمعه",
    link() {
      return `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/content/day?q=${this.en}`;
    },
  },
];
