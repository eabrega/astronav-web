<template>
    <div class="about">
        <h1>Описание</h1>
        <p>
            Сервис <b>astronav.ru</b> - это астрономический калькулятор построенный на формулах
            описанных в книге
            <a href="https://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D1%91%D1%81,_%D0%96%D0%B0%D0%BD"
                >Жанна Меёса</a
            >
            "Астрономические формулы для калькуляторов". Программа расчета была написана на языке
            фортран в ~1991 году Брегой А. Н. иходный код которой доступен на
            <a href="https://github.com/eabrega/astronav"> GitHub</a>.
        </p>
        <h2>Основные возможности</h2>
        <p>
            Оригинальная программа BRE.FOR позволяет отображать координаты 7 наиболее ярких небесных
            тел. Проблема заключалась в том, что вывод значений осуществлялся в виде
            форматированного текста, что довольно неудобно для восприятия и использования.
        </p>
        <p>
            Сервис <b>astronav.ru</b> создан для упрощения прогнозирования положения небесных тел, а
            также поиска значимых астрономических событий в заданных координатах наблюдателя.
        </p>
        <h2>Ход разработки</h2>
        <ol>
            <li>Сборка исходного кода под Linux.<span class="sumbol-v">✓</span></li>
            <li>
                Разработка Web-API для получения данных.
                <span class="sumbol-v">✓</span>
            </li>
            <li>
                Разработка
                <a href="https://github.com/eabrega/plotter">Plottera</a> для отображения карты
                звездного неба.
                <span class="sumbol-v">✓</span>
            </li>
            <li>
                Разработка
                <a href="https://github.com/eabrega/astronav-web">web-приложения.</a
                ><span class="sumbol-v">✓</span>
            </li>
            <li>
                Корректировка получаемых данных с учетом часового пояса наблюдателя.<span
                    class="sumbol-v"
                    >✓</span
                >
            </li>
            <li>Отображение фаз Луны, Венеры и Меркурия. <span class="sumbol-v">✓</span></li>
            <li>Отображение созвездий. <b>(запланировано)</b></li>
            <li>
                Загрузка прогноза на месяц и год в формате Excel.
                <b>(запланировано)</b>
            </li>
            <li>
                Создание планировщика с возможностью отправки e-mail о приближающемся астрономическом
                событии (видимом из положения наблюдателя). <b>(запланировано)</b>
            </li>
        </ol>
        <h2>Отказ от ответственности</h2>
        <p>
            <b>Внимание!</b>
        </p>
        <p>
            Данные полученные при использовании сервиса
            <b>astronav.ru</b> используются "как есть". Проект разрабатывается на безвозмездной
            основе в образовательных целях и из любви к астрономии и программированию. Разработчики
            и авторы не несут ответственности за гипотетически или реальный ущерб полученный вследствие 
            их использования.
        </p>
        <h2>Контакты</h2>
        <p>
            <b>e-mail:</b>
            <a href="mailto:eabrega@gmail.com"> eabrega@gmail.com</a>
        </p>
    </div>
</template>

<script>
export default {
    metaInfo: {
        title: "О проекте",
        meta: [
            {
                vmid: "description",
                name: "description",
                content:
                    "Сервис astronav.ru - это астрономический калькулятор построенный на формулах " +
                    "описанных в книге Жанна Меёса 'Астрономические формулы для калькуляторов'. " +
                    "Программа расчета была написанна на языке фортран в ~1991 году Брегой А. Н.",
            },
        ],
    },
};
</script>

<style lang="scss">
.about {
    font-weight: 400;

    .sumbol-v {
        padding-left: 15px;
        font-size: 1em;
        font-weight: bolder;
        color: green;
    }

    li {
        padding-top: 10px;
        padding-bottom: 10px;
    }

    ol {
        list-style-type: none;
        font-size: 1em;
        li{
            padding: 8px;
            font-size: 1em;
        }
    }
}
</style>
