const books = [
  { bookNumber: 10, ru: ['Быт', 'Бытие'] },
  { bookNumber: 20, ru: ['Исх', 'Исход'] },
  { bookNumber: 30, ru: ['Лев', 'Левит'] },
  { bookNumber: 40, ru: ['Чис', 'Числа'] },
  { bookNumber: 50, ru: ['Втор', 'Второзаконие'] },
  { bookNumber: 60, ru: ['Нав', 'Иисус Навин'] },
  { bookNumber: 70, ru: ['Суд', 'Судьи'] },
  { bookNumber: 80, ru: ['Руфь', 'Руфь'] },
  { bookNumber: 90, ru: ['1Цар', '1 Царств'] },
  { bookNumber: 100, ru: ['2Цар', '2 Царств'] },
  { bookNumber: 110, ru: ['3Цар', '3 Царств'] },
  { bookNumber: 120, ru: ['4Цар', '4 Царств'] },
  { bookNumber: 130, ru: ['1Пар', '1 Паралипоменон'] },
  { bookNumber: 140, ru: ['2Пар', '2 Паралипоменон'] },
  { bookNumber: 150, ru: ['Ездр', 'Ездра'] },
  { bookNumber: 160, ru: ['Неем', 'Неемия'] },
  { bookNumber: 190, ru: ['Есф', 'Есфирь'] },
  { bookNumber: 220, ru: ['Иов'] },
  { bookNumber: 230, ru: ['Пс', 'Псалтирь'] },
  { bookNumber: 240, ru: ['Прит', 'Притчи'] },
  { bookNumber: 250, ru: ['Еккл', 'Екклесиаст'] },
  { bookNumber: 260, ru: ['Песн', 'Песня Песней'] },
  { bookNumber: 290, ru: ['Ис', 'Исаия'] },
  { bookNumber: 300, ru: ['Иер', 'Иеремия'] },
  { bookNumber: 310, ru: ['Плач', 'Плач Иеремии'] },
  { bookNumber: 330, ru: ['Иез', 'Иезекииль'] },
  { bookNumber: 340, ru: ['Дан', 'Даниил'] },
  { bookNumber: 350, ru: ['Ос', 'Осия'] },
  { bookNumber: 360, ru: ['Иоил', 'Иоиль'] },
  { bookNumber: 370, ru: ['Ам', 'Амос'] },
  { bookNumber: 380, ru: ['Авд', 'Авдий'] },
  { bookNumber: 390, ru: ['Ион', 'Иона'] },
  { bookNumber: 400, ru: ['Мих', 'Михей'] },
  { bookNumber: 410, ru: ['Наум'] },
  { bookNumber: 420, ru: ['Авв', 'Аввакум'] },
  { bookNumber: 430, ru: ['Соф', 'Софония'] },
  { bookNumber: 440, ru: ['Агг', 'Аггей'] },
  { bookNumber: 450, ru: ['Зах', 'Захария'] },
  { bookNumber: 460, ru: ['Мал', 'Малахия'] },
  { bookNumber: 470, ru: ['Мат', 'От Матфея'] },
  { bookNumber: 480, ru: ['Мар', 'От Марка'] },
  { bookNumber: 490, ru: ['Лук', 'От Луки'] },
  { bookNumber: 500, ru: ['Ин', 'От Иоанна'] },
  { bookNumber: 510, ru: ['Деян', 'Деяния'] },
  { bookNumber: 660, ru: ['Иак', 'Иакова'] },
  { bookNumber: 670, ru: ['1Пет', '1-е Петра'] },
  { bookNumber: 680, ru: ['2Пет', '2-е Петра'] },
  { bookNumber: 690, ru: ['1Ин', '1-е Иоанна'] },
  { bookNumber: 700, ru: ['2Ин', '2-е Иоанна'] },
  { bookNumber: 710, ru: ['3Ин', '3-е Иоанна'] },
  { bookNumber: 720, ru: ['Иуд', 'Иуды'] },
  { bookNumber: 520, ru: ['Рим', 'К Римлянам'] },
  { bookNumber: 530, ru: ['1Кор', '1-е Коринфянам'] },
  { bookNumber: 540, ru: ['2Кор', '2-е Коринфянам'] },
  { bookNumber: 550, ru: ['Гал', 'К Галатам'] },
  { bookNumber: 560, ru: ['Еф', 'К Ефесянам'] },
  { bookNumber: 570, ru: ['Флп', 'К Филиппийцам'] },
  { bookNumber: 580, ru: ['Кол', 'К Колоссянам'] },
  { bookNumber: 590, ru: ['1Фес', '1-е Фессалоникийцам'] },
  { bookNumber: 600, ru: ['2Фес', '2-е Фессалоникийцам'] },
  { bookNumber: 610, ru: ['1Тим', '1-е Тимофею'] },
  { bookNumber: 620, ru: ['2Тим', '2-е Тимофею'] },
  { bookNumber: 630, ru: ['Тит', 'К Титу'] },
  { bookNumber: 640, ru: ['Флм', 'К Филимону'] },
  { bookNumber: 650, ru: ['Евр', 'К Евреям'] },
  { bookNumber: 730, ru: ['Откр', 'Откровение'] },
]

export const getBookNumberByName = (bookName: string) => {
  const book = books.find(({ ru }) => {
    return !!ru.find((name) => name.toLowerCase().includes(bookName.toLowerCase()))
  })

  return book?.bookNumber
}