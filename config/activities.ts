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
    id: "pool-training",
    name: "Тренировка по плаванью",
    time: "11:30 – 13:30",
    description: "Занятие с Ольгой Андреевой в бассейне: мастер класс по технике плавания,или вводный урок: адаптация к воде. В стоимость входит аренда дорожки и мастер класс. Необходимо приобрести входной билет в комплекс",
    capacity: 12,
    remainingPlaces: 12,
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
    time: "11:30 – 13:00",
    description: "Тренировка по футболу с Антоном в Margitszigeti Atlétikai Centrum .",
    capacity: 30,
    remainingPlaces: 18,
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
    time: "12:00 – 14:00",
    description: "Пляжный волейбол на площадке у воды. Любой уровень.",
    capacity: 24,
    remainingPlaces: 20,
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
    time: "13:00 – 15:00",
    description: "Ракетки и мячи предоставляем. Короткий вводный урок для новичков.",
    capacity: 16,
    remainingPlaces: 6,
    isActive: true,
    adultAllowed: true,
    childAllowed: false,
    studentAllowed: true,
    minimumAge: 14,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
  {
    id: "sport-training",
    name: "Спортивная тренировка",
    time: "09:30 – 10:30",
    description: "Общая функциональная тренировка на свежем воздухе.",
    capacity: 40,
    remainingPlaces: 31,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: 12,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
  {
    id: "dance-training",
    name: "Танцевальная тренировка",
    time: "15:00 – 16:30",
    description: "Открытый танцевальный класс. Без подготовки, приходите как есть.",
    capacity: 35,
    remainingPlaces: 25,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: null,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
  {
    id: "masterclass",
    name: "Мастер-класс",
    time: "14:00 – 15:30",
    description: "Творческий мастер-класс: материалы и всё необходимое на месте.",
    capacity: 25,
    remainingPlaces: 15,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: null,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
  {
    id: "mafia",
    name: "Игра в мафию",
    time: "17:00 – 19:00",
    description: "Классическая мафия с ведущим. Несколько столов, любой уровень.",
    capacity: 30,
    remainingPlaces: 22,
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
    time: "18:00 – 19:30",
    description: "Командный квиз о музыке, кино и Будапеште. Призы победителям.",
    capacity: 50,
    remainingPlaces: 38,
    isActive: true,
    adultAllowed: true,
    childAllowed: true,
    studentAllowed: true,
    minimumAge: null,
    maximumAge: null,
    requiresSwimmingInfo: false,
  },
  {
    id: "other",
    name: "Другая активность",
    time: "в течение дня",
    description: "Свободное участие в программе фестиваля: сцена, ярмарка, зоны отдыха.",
    capacity: 100,
    remainingPlaces: 84,
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
