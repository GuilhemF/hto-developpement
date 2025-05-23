let hasLogged = false;

export const logger = {
  sayHello() {
    if (hasLogged) return;

    console.log(
      "%c💻 Made by WESIGN, with ❤️" + "%chttps://www.wesign.fr/",
      "border-radius: 4px 0 0 4px; background: #000000; color: white; font-size: 12px; padding: 9px 10px; margin: 20px 0px 24px 0px;",
      "border-radius: 0 4px 4px 0; background: #ffffff; color: black; font-size: 12px; padding: 9px 10px; margin: 20px 0px 24px 0px;"
    );

    hasLogged = true;
  },
};
