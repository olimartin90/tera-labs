import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Home = () => {
    return (
      <div>
         <section>
         Favorite Food: <FontAwesomeIcon icon="stroopwafel" />
          <h1> TeraLabs </h1>
          <p> Spicy jalapeno bacon ipsum dolor amet frankfurter kielbasa filet mignon turducken landjaeger, pancetta chuck shoulder pork belly bacon Ground round drumstick spare ribs filet mignon chuck tongue fatback prosciutto strip steak. Pork filet mignon leberkas swine turkey flank corned beef shank bacon prosciutto ground round t-bone jowl kevin Corned beef shoulder jowl alcatra short loin pancetta buffalo picanha strip steak pork belly turkey kielbasa chicken salami Meatball hamburger corned beef short loin, t-bone tri-tip short ribs Venison beef ribs chicken, tongue jowl landjaeger prosciutto shoulder cow pancetta doner. </p>
          <img src={process.env.PUBLIC_URL + '/paysage2.jpg'} alt= "" />;
         </section>

         <section>
          <div>
            <h3> Collect </h3>
            <p> Spicy jalapeno bacon ipsum dolor amet sirloin prosciutto ham hock ham frankfurter Swine andouille pastrami strip steak Andouille sirloin doner flank pastrami tongue ground round short loin venis</p>
          </div>
          <div>
            <h3> Display </h3>
            <p> Spicy jalapeno bacon ipsum dolor amet sirloin prosciutto ham hock ham frankfurter Swine andouille pastrami strip steak Andouille sirloin doner flank pastrami tongue ground round short loin venis</p>
          </div>
          <div>
            <h3> Monitor </h3>
            <p> Spicy jalapeno bacon ipsum dolor amet sirloin prosciutto ham hock ham frankfurter Swine andouille pastrami strip steak Andouille sirloin doner flank pastrami tongue ground round short loin venis </p>
          </div>
         </section>
          <h2> How does our app work </h2>
         <section>
         </section>
      </div>
    )
}

export default Home;
