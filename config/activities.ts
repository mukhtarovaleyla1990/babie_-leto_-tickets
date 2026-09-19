/**
 * Активности фестиваля. Меняются только здесь — UI и логика подстраиваются сами.
 *
 * adultAllowed / childAllowed / studentAllowed — для каких типов билетов активность доступна.
 * minimumAge / maximumAge — null, если ограничения нет.
 * requiresSwimmingInfo — включает обязательные поля про плавание для участника.
 */

export type Activity = {
  id: string;
  name: string;
  time: string;
  description: string;
  capacity: number;
  remainingPlaces: number;
  isActive: boolean;
  adultAllowed: boolean;
  childAllowed: boolean;
  studentAllowed: boolean;
  minimumAge: number | null;
  maximumAge: number | null;
  requiresSwimmingInfo: boolean;
};

export const ACTIVITIES: Activity[] = [

  {
    id: "yoga",
    name: "Йога",
    time: "10:00 – 11:00",
    description: "Йога с Аидой Чиналиевой. Шавасана с поющими чашами с Борисом Водоковым. С собой иметь коврики",
    capacity: 20,
    remainingPlaces: 20,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: 16,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
  {
    id: "fitness",
    name: "Фитнес тренировка Аэрофункционал",
    time: "10:00 – 11:00",
    description: "Тренировка c собственным весом в Holdudvar с Ольгой Литвиновой. С собой иметь коврики.",
    capacity: 20,
    remainingPlaces: 20,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: null,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
  {
    id: "book club",
    name: "Книжный клуб",
    time: "11:20 – 12:00",
    description: "Книжный клуб Vdohnovengria.Мини-квиз. Розыгрыш подарков",
    capacity: 50,
    remainingPlaces: 50,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: 10,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
  {
    id: "pool-training.kids 1",
    name: "Тренировка по плаванию для родителей и детей от 5 лет",
    time: "11:30 – 12:15",
    description: "Занятие с тренерами детской школы плаванья Ольги Андреевой в детском бассейне: мастер класс по технике плавания,или вводный урок: адаптация к воде. В стоимость входит аренда дорожки и мастер класс. Необходимо приобрести входной билет в комплекс",
    capacity: 4,
    remainingPlaces: 4,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: 5,
    maximumAge: null,
    requiresSwimmingInfo: true,
  },
  {
    id: "pool-training.kids 2",
    name: "Тренировка по плаванию для родителей и детей от 5 лет",
    time: "12:20 – 13:05",
    description: "Занятие с тренерами детской школы плаванья Ольги Андреевой в детском бассейне: мастер класс по технике плавания,или вводный урок: адаптация к воде. В стоимость входит аренда дорожки и мастер класс. Необходимо приобрести входной билет в комплекс",
    capacity: 4,
    remainingPlaces: 4,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: 5,
    maximumAge: null,
    requiresSwimmingInfo: true,
  },
  {
    id: "pool-training 1",
    name: "Тренировка по плаванию для взрослых Продвинутые",
    time: "11:30 – 12:15",
    description: "Занятие с Ольгой Андреевой: мастер класс по технике плавания для продвинутых. В стоимость входит аренда дорожки и мастер класс. Необходимо приобрести входной билет в комплекс",
    capacity: 6,
    remainingPlaces: 6,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: 5,
    maximumAge: null,
    requiresSwimmingInfo: true,
  },
  {
    id: "pool-training 2",
    name: "Тренировка по плаванию для взрослых Начинающие",
    time: "12:20 – 13:05",
    description: "Занятие с Ольгой Андреевой: мастер класс по плаванию для начинающих. В стоимость входит аренда дорожки и мастер класс. Необходимо приобрести входной билет в комплекс",
    capacity: 6,
    remainingPlaces: 6,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: 5,
    maximumAge: null,
    requiresSwimmingInfo: true,
  },
  {
    id: "football",
    name: "Футбол",
    time: "12:00 – 13:00",
    description: "Тренировка по футболу с Антоном в Margitszigeti Atlétikai Centrum. В комлексе есть душ .",
    capacity: 12,
    remainingPlaces: 12,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: 10,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
  {
    id: "volleyball",
    name: "Волейбол",
    time: "12:00 – 13:00",
    description: "Тренировка по волейболу с Алексеем Дениным в Margitszigeti Atlétikai Centrum.В комлексе есть душ .",
    capacity: 12,
    remainingPlaces: 12,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: 10,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
  {
    id: "padel",
    name: "Падел",
    time: "12:00 – 13:00",
    description: " Вводный урок для новичков от Ярослава Лазара в Margitszigeti Atlétikai Centrum.В комлексе есть душ. Для получения инвентаря с собой иметь любой документ .",
    capacity: 10,
    remainingPlaces: 10,
    isActive: true,
    adultAllowed: true,
    childAllowed: false,
    studentAllowed: true,
    minimumAge: 14,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
  {
    id: "pilates",
    name: "Пилатес",
    time: "11:30 – 12:30",
    description: "Trenish. Пилатес. С собой иметь коврики",
    capacity: 20,
    remainingPlaces: 20,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: null,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
  {
    id: "Business Brunch",
    name: "Бизнес-бранч Жизнь в эмиграции/ Плюсы и минусы Венгерского законодательства",
    time: "12:00 – 14:00",
    description: "Деловая встреча с Александром Квочкиным-риэлтор, Даниеллой Пубик-миграционный специалист , Ириной Хамовой-психолог, Еленой Холодовой -профориентолог, Артуром Арустамяном-преподаватель венгеркого. Питание не входит в стоимость.",
    capacity: 50,
    remainingPlaces: 50,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: 10,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
  {
    id: "fitnes-next",
    name: "Фитнес тренировка Богиня",
    time: "14:15– 15:00",
    description: "Тренировка с собственным весом в Holdudvar c Ливией Фекете-Сербайло. С собой иметь коврики.",
    capacity: 30,
    remainingPlaces: 30,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: 12,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
  {
    id: "sambo",
    name: "Боевое и спортивное самбо.",
    time: "15:00– 16:00",
    description: "Тренировка в Holdudvar с Валентином Гудочниковым. Самооборона.",
    capacity: 30,
    remainingPlaces: 30,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: 12,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
  {
    id: "acting",
    name: "Актерское Мастерство.",
    time: "15:00– 16:00",
    description: "Мастер-класс в Holdudvar с Екатериной Тучиной.",
    capacity: 30,
    remainingPlaces: 30,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: 12,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
  {
    id: "speech",
    name: "Мастер-класс по речевому имиджу.",
    time: "15:30– 16:30",
    description: "Мастер-класс в Holdudvar с Дарьей Васильевой.",
    capacity: 30,
    remainingPlaces: 30,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: 12,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
  {
    id: "zumba",
    name: "Танцевальная фитнес тренеровка.",
    time: "16:00– 16:30",
    description: "Zumba  c Алиной Толстиковой в Holdudvar.",
    capacity: 30,
    remainingPlaces: 30,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: 12,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
  
  {
    id: "bellydance",
    name: "Мастер класс по танцу живота.",
    time: "16:30– 17:00",
    description: "Belly dance с Яной Рашид в Holdudvar.",
    capacity: 30,
    remainingPlaces: 30,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: 12,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
  {
    id: "painting",
    name: "Мастерская Golden Duck. Творческий клуб Besedka.",
    time: "17:00– 18:00",
    description: "Мастер-класс по росписи открыток акрилом на темно и светлом фоне. Для детей и взрослых.",
    capacity: 30,
    remainingPlaces: 30,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: 7,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
  {
    id: "kung fu",
    name: "3 Мастер-класса по кунг-фу для детей и взрослых ",
    time: "17:00– 18:00",
    description: "Кунг- Фу в Holdudvar с тренерами Sárkánykard Kungfu és Wushu Sport Egyesüle.",
    capacity: 50,
    remainingPlaces: 50,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: 12,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
  {
    id: "quiz",
    name: "Квиз",
    time: "19:30 – 21:30",
    description: "Безнравственный квиз 18+ в Holdudvar.",
    capacity: 70,
    remainingPlaces: 70,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: null,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
   {
    id: "chess",
    name: "Мастер класс по шахматам ",
    time: "18:00– 19:00",
    description: "Мастер класс и игра в шахматы с Алексеем Бравиным в в Holdudvar.",
    capacity: 30,
    remainingPlaces: 30,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: 7,
    maximumAge: null,
    requiresSwimmingInfo: false,
 
  },
  {
    id: "other",
    name: "Разные активности",
    time: "в течение дня",
    description: "Свободное участие в программе фестиваля в Holdudvar: все дневные и вечерние мастер-классы , опен эйр тренировки и танцы, возможность присоедениться к любой активности в Holdudvar в свободном режиме, зоны отдыха.",
    capacity: 200,
    remainingPlaces: 200,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: null,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
];

export const ACTIVE_ACTIVITIES = ACTIVITIES.filter((a) => a.isActive);

export function getActivity(id: string): Activity | undefined {
  return ACTIVE_ACTIVITIES.find((a) => a.id === id);
}

export function hasPlaces(activity: Activity): boolean {
  return activity.remainingPlaces > 0;
}

/** Активности, подходящие под аудиторию выбранного билета. */
export function activitiesForAudience(
  audience: "adult" | "child" | "student"
): Activity[] {
  return ACTIVE_ACTIVITIES.filter((a) =>
    audience === "adult"
      ? a.adultAllowed
      : audience === "child"
        ? a.childAllowed
        : a.studentAllowed
  );
}

/** Уровни плавания для активностей с requiresSwimmingInfo. */
export const SWIMMING_LEVELS = [
  "Не умею плавать",
  "Начальный",
  "Средний",
  "Уверенно плаваю",
  "Продвинутый",
] as const;

export type SwimmingLevel = (typeof SWIMMING_LEVELS)[number];
