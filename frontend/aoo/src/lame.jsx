import React from "react";

function LamePage({ title, description, url, btnContent }) {
  return (
    <main className="error-page">
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@200;500&display=swap");

          :root {
            --primary-color: #fff;
            --eye-pupil-color: #181818;
            --bg-color: #fff;
            --text-color: #000;
            --fs-heading: 36px;
            --fs-text: 26px;
            --fs-button: 18px;
            --fs-icon: 30px;
            --pupil-size: 30px;
            --eye-size: 80px;
            --button-padding: 15px 30px;

            @media only screen and (max-width: 567px) {
              --fs-heading: 30px;
              --fs-text: 22px;
              --fs-button: 16px;
              --fs-icon: 24px;
              --button-padding: 12px 24px;
            }
          }

          .container {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }

          .error-page {
            display: flex;
            align-items: center;
            width: 40vw;
            margin: 0;
            flex-direction: column;
          }

          .error-page__heading-title {
            text-transform: capitalize;
            font-size: var(--fs-heading);
            font-weight: 500;
            color: var(--primary-color);
          }

          .error-page__heading-desciption {
            margin-top: 10px;
            font-size: var(--fs-text);
            font-weight: 200;
          }

          .error-page__button {
            color: inherit;
            text-decoration: none;
            border: 1px solid var(--primary-color);
            font-size: var(--fs-button);
            font-weight: 200;
            padding: var(--button-padding);
            border-radius: 15px;
            box-shadow: 0px 7px 0px -2px var(--primary-color);
            transition: all 0.3s ease-in-out;
            text-transform: capitalize;
          }

          .error-page__button:hover {
            box-shadow: none;
            background-color: var(--primary-color);
            color: #181818;
          }

          .eyes {
            margin-bottom:2vh;
            display: flex;
            justify-content: center;
            gap: 2px;
          }

          .eye {
            width: var(--eye-size);
            height: var(--eye-size);
            background-color: var(--primary-color);
            border-radius: 50%;
            display: grid;
            place-items: center;
          }

          .eye__pupil {
            width: var(--pupil-size);
            height: var(--pupil-size);
            background-color: var(--eye-pupil-color);
            border-radius: 50%;
            animation: movePupil 2s infinite ease-in-out;
            transform-origin: center center;
          }

          @keyframes movePupil {
            0%, 100% {
              transform: translate(0, 0);
            }
            25% {
              transform: translate(-10px, -10px);
            }
            50% {
              transform: translate(10px, 10px);
            }
            75% {
              transform: translate(-10px, 10px);
            }
          }
        `}
      </style>

      <div className="container">
        <div className="eyes">
          <div className="eye">
            <div className="eye__pupil eye__pupil--left"></div>
          </div>
          <div className="eye">
            <div className="eye__pupil eye__pupil--right"></div>
          </div>
        </div>

        <div className="error-page__heading">
          <center>
            <h1 className="error-page__heading-title">{title}</h1>
            <p className="error-page__heading-desciption">{description}</p>
          </center>
        </div>

        <a className="error-page__button" href={url} aria-label={btnContent} title={btnContent}>
          {btnContent}
        </a>
      </div>
    </main>
  );
}

export default LamePage;
