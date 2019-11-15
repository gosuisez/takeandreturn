/* Imports */
import { intro } from '@app/styles/config';
/* /Imports/ */

const slides = [
    {
        key: 's1',
        backgroundColor: '#2EBEE5',
        title: 'Вземи и върни',
        titleStyle: intro.appIntroTitle,
        text: 'Добре, Дошли! Благодарим Ви, че избрахте нашето приложение!',
        textStyle: intro.appIntroText,
        image: require('@app/assets/images/logo.png'),
        imageStyle: intro.appIntroImage
    },
    {
        key: 's2',
        backgroundColor: '#98cc00',
        title: 'Какво представлява нашето приложение?',
        titleStyle: intro.appIntroTitle,
        text: 'Приложението представлява мултиплатформена система, която дава улеснен достъп до целия инвентар на дадена фирма и предлага възможност за интерактивна комуникация между отговорника за инвентара и работниците.',
        textStyle: intro.appIntroText,
        image: require('@app/assets/images/intro/book.png'),
        imageStyle: intro.appIntroImage
    },
    {
        key: 's3',
        backgroundColor: '#808080',
        title: 'Каква е целта му?',
        titleStyle: intro.appIntroTitle,
        text: 'Целта е бързо, полезно и удобно следене на наличностите, като има човек, който се грижи за инвентара на дадената фирма и по този начин се осъществява лесна връзка, с която цялата информация за работниците и инструментите се записва.',
        textStyle: intro.appIntroText,
        image: require('@app/assets/images/intro/bulb.png'),
        imageStyle: intro.appIntroImage
    },
    {
        key: 's4',
        backgroundColor: '#3395ff',
        title: 'Инструментите',
        titleStyle: intro.appIntroTitle,
        text: 'Това меню съдържа едни от основните категории инструменти, добавени от нас, също така ви дава възможността да създавате свои подкатегории и да добавяте инструменти към тях.',
        textStyle: intro.appIntroText,
        image: require('@app/assets/images/intro/toolbox.png'),
        imageStyle: intro.appIntroImage
    },
    {
        key: 's5',
        backgroundColor: '#993f6c',
        title: 'Взети и върнати',
        titleStyle: intro.appIntroTitle,
        text: 'Взети и върнати представлява списък, в който вие можете да преглеждате кой инструмент в кой работник е, дали го е взел и дали го е върнал.',
        textStyle: intro.appIntroText,
        image: require('@app/assets/images/tr.png'),
        imageStyle: intro.appIntroImage
    },
    {
        key: 's6',
        backgroundColor: '#ffc107',
        title: 'Работниците',
        titleStyle: intro.appIntroTitle,
        text: 'Менюто работници представлява списък, в който вие можете да създавате, преглеждате, редактирате и премахвате работници в зависимост от нуждите ви.',
        textStyle: intro.appIntroText,
        image: require('@app/assets/images/intro/workers.jpg'),
        imageStyle: intro.appIntroImage
    },
    {
        key: 's7',
        backgroundColor: '#008dc7',
        title: 'График на работниците',
        titleStyle: intro.appIntroTitle,
        text: 'Графикът на работниците представлява календар, в който вие можете да отбелязвате работното време на работниците си и също така да проверявате кой от работниците ви кога е на работа.',
        textStyle: intro.appIntroText,
        image: require('@app/assets/images/intro/calendar-clock.png'),
        imageStyle: intro.appIntroImage
    },
    {
        key: 's8',
        backgroundColor: '#FFA500',
        title: 'Отсъстващи работници',
        titleStyle: intro.appIntroTitle,
        text: 'Менюто съдържа календар с работници, като в него вие можете да добавяте и прегледжате отсъстващите работници и причините, по които ги няма.',
        textStyle: intro.appIntroText,
        image: require('@app/assets/images/intro/absences.png'),
        imageStyle: intro.appIntroImage
    }
];

/* Exports */
export default slides;
/* /Exports/ */
