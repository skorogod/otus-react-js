import React from 'react';
import './App.css';
import { ProductDetails } from 'src/shared/productDetails/ProductDetails';

function App() {
  return (
    <div className="App">
      <ProductDetails
        description={`
          ⭐Без СПАМБЛОКА!\n
          ⭐Для любых целей\n
          ⭐PREMIUM - качество.\n
          ⭐Владелец - только вы! Ставите двухфакторку и привязываете почту.\n\n

          ✔ Отвечаю быстро.\n
          ✔ Моментальная выдача товара.\n\n

          ❓ Как будет происходить сделка?\n

          1️⃣ Вы оплачиваете товар.\n
          2️⃣ Я присылаю вам номер, вы заходите и просите код.\n
          3️⃣ Далее вы меняете данные и вы ставите Облачный пароль (2FA).`}
        inStock={700}
        costFull={200}
        costDiscount={300}
        title="Telegram accounts. Session + JSON. Высокое качество."
        images={[
          'https://avatars.mds.yandex.net/get-vthumb/3333356/915836b1bb9bbb4bc9257fa973baefd8/800x450',
          'https://i.ytimg.com/vi/ht1IDr80VEw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBIiNHir1hgLfxO_2g7g0zCB_OFqg',
          'https://avatars.mds.yandex.net/get-vthumb/3333356/915836b1bb9bbb4bc9257fa973baefd8/800x450',
          'https://i.ytimg.com/vi/ht1IDr80VEw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBIiNHir1hgLfxO_2g7g0zCB_OFqg',
          'https://avatars.mds.yandex.net/get-vthumb/3333356/915836b1bb9bbb4bc9257fa973baefd8/800x450',
          'https://i.ytimg.com/vi/ht1IDr80VEw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBIiNHir1hgLfxO_2g7g0zCB_OFqg',
        ]}
        category={{ name: 'Аккаунты' }}
      ></ProductDetails>
    </div>
  );
}

export default App;
