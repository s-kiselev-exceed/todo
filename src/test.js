import React from "react";
import ReactDOM from "react-dom";

const myNews = [
  {
    author: "Саша Печкин",
    text: "В четверг, четвертого числа..."
  },
  {
    author: "Просто Вася",
    text: "Считаю, что $ должен стоить 35 рублей!"
  },
  {
    author: "Max Frontend",
    text: "Прошло 2 года с прошлых учебников, а $ так и не стоит 35"
  },
  {
    author: "Гость",
    text: "Бесплатно. Без смс, про реакт, заходи - https://maxpfrontend.ru"
  }
];

class New extends React.Component {
  render() {
    const news = this.props.data.map(function(item, index) {
      return (
        <div>
          <p>{item.author}</p>
          <p>{item.text}</p>
        </div>
      );
    });
    return <div className="news">{newsTemplate}</div>;
  }
}

class Add extends React.Component {
  render() {
    return (
      <div>
        <h1>Я компонент</h1>
        <p>components can include</p>
        <New />
      </div>
    );
  }
}
