// ІМПОРТУЄМО БІБЛІОТЕКИ БЕЗ ЯКИХ НЕ МОЖЕМО ПИСАТИ КОД
import React from "react";

// ІМПОРТУЄМО ПОТРІБНІ КОМПОНЕНТИ
import Page from "./component/Page";
import Header from "./component/Header";
import Balance from "./component/Balance";
import Menu from "./component/Menu";
import Payment from "./component/Payment";

// КОНФІГУРАЦІЯ ========================================

const START_BALANCE = 0;
const LIMIT_BALANCE = 100000;
const GET_MONEY = 100;
const SALARY_AMOUNT = 1000;
const COURCE_PRICE = 850;

export default function App() {
  // ФУНКЦІОНАЛ БАЛАНСУ ========================

  // Ось тут тримаємо актуальне значення балансу

  const [balance, setBalance] = React.useState(START_BALANCE);

  // Функція для прямого поповнення балансу
  const getMoney = () => setBalance(balance + GET_MONEY);

  // Функція яка виконується кожен раз коли наш баланс змінився
  React.useEffect(() => {
    // Перевірка на ліміт балансу
    if (balance > LIMIT_BALANCE) {
      alert(`Ваш ліміт балансу: ${LIMIT_BALANCE}`);
      setBalance(START_BALANCE);
    }

    // Перевірка на мінусовий баланс
    if (balance < 0) {
      alert(`Ви використали усі свої гроші. Поповніть картку`);
      // setBalance(0);
    }
    // Сюди записуються змінні при оновленні яких буде виконуватися функція
  }, [balance]);

  // ФУНКЦИОНАЛ ТРАНЗАКЦИЙ====================================
  const [payment, setPayment] = React.useState([]);
  const getSalary = () => {
    setBalance(balance + SALARY_AMOUNT);
    setPayment([
      {
        name: "Зарплата",
        amount: SALARY_AMOUNT,
        type: "+"
      },
      ...payment
    ]);
  };
  const buyCource = () => {
    setBalance(balance - COURCE_PRICE);
    setPayment([
      {
        name: "Купити курс",
        amount: COURCE_PRICE,
        type: "-"
      },
      ...payment
    ]);
  };
  const buyFood = () => {
    setBalance(balance - 20);
    setPayment([
      {
        name: "Купить еду",
        amount: 20,
        type: "*"
      },
      ...payment
    ]);
  };

  // ВЕРСТКА ІНТЕРФЕЙСУ ==========================================

  // ця функція відкриває вікно в браузері з текстом
  // const doLogin = () => {
  //   const Login = prompt('Ваш логин');
  //   alert(Login);
  // };
  const HelloWorld = () => alert("Hello World");

  return (
    <Page>
      {/* компонент шапки з нашою назвою
          також при кліку мишкою на шапку
          в нас визивається функція HelloWorld
      */}

      <Header name="IT-BRAINS BANK" onClick={HelloWorld} />

      {/* Компонент баланса в який передається
          Актуальне значення балансу  */}
      <Balance balance={balance} />

      {/* Компонент меню з кнопками */}
      <Menu
        // ось сюди ми передаємо конфігурацію кнопок
        config={[
          {
            name: "Поповнити баланс",
            onClick: getMoney,
            img: "/icon/get.svg"
          },
          {
            name: "Отримати зарплату",
            onClick: getSalary,
            img: "/icon/cat.svg"
          },
          {
            name: "Купити курс",
            onClick: buyCource,
            img: "/icon/dog.svg"
          },
          {
            name: "Еда",
            onClick: buyFood,
            img: "/icon/apple.svg"
          }
        ]}
      />
      {/* компонент списка наших транзакцій
          цей функціонал ми будемо робити на 3 уроці
      */}
      <Payment payment={payment} />

      {/*!!!!!! Уважно! [] в параметрі payment є заглушкою */}
    </Page>
  );
}
