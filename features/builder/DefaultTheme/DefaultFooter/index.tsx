import { defaultCategories } from "@/features/builder/DefaultTheme/DefaultHeader/data";
import facebookLogo from "@/public/facebook_logo.svg";
import instagramLogo from "@/public/instagram_logo.svg";
import telegramLogo from "@/public/telegram_logo.svg";
import Image from "next/image";
import Link from "next/link";

export function DefaultFooter({
  shopLink,
  logo,
  categories,
}: {
  shopLink: string;
  logo?: string;
  categories?: string[];
}) {
  return (
    <footer className="mt-8">
      <div className="mt-4 flex justify-between border-t border-neutral-200 py-3">
        <div className="w-2/3">
          <p>Oleny Telihy St, 27, Kyiv, Ukraine, 04060</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2539.1074683509146!2d30.448692!3d50.47634299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cdb83f0985a3%3A0xf3d7872f04708554!2sOleny%20Telihy%20St%2C%2027%2C%20Kyiv%2C%20Ukraine%2C%2002000!5e0!3m2!1sen!2sde!4v1687342432015!5m2!1sen!2sde"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-96 w-full"
          ></iframe>
        </div>
        <section className="flex flex-col gap-3">
          <h4 className="font-bold">Contact Us</h4>
          <ul className="w-52">
            {[
              { day: "Mon - Fri", time: "10:00-17:00" },
              { day: "Saturday", time: "12:00-15:00" },
              { day: "Sunday", time: "Closed" },
            ].map(({ day, time }) => (
              <li key={day + time} className="flex justify-between">
                <span>{day}</span>
                <span>{time}</span>
              </li>
            ))}
          </ul>
          <p>mytheresashop@info.com</p>
          <ul>
            {["+38 (068) 976-34-87", "+38 (063) 467-23-95"].map((number) => (
              <li key={number}>{number}</li>
            ))}
          </ul>
          <div className="flex gap-1">
            {[
              { socialMedia: "instagram", link: "https://instagram.com" },
              { socialMedia: "telegram", link: "https://telegram.org" },
              { socialMedia: "facebook", link: "https://facebook.com" },
            ].map(({ socialMedia, link }) => (
              <Link key={socialMedia} href={link} target="_blank">
                <Image
                  src={
                    socialMedia === "instagram"
                      ? instagramLogo
                      : socialMedia === "telegram"
                      ? telegramLogo
                      : facebookLogo
                  }
                  alt={link}
                  className="h-10 w-10"
                />
              </Link>
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-3">
          <h4 className="font-bold">Catalog</h4>
          <nav className="flex flex-col gap-2">
            {categories && categories.length > 0
              ? categories.map((category) => (
                  <Link
                    key={category}
                    href={`/shop/${shopLink}/categories/${category}`}
                    className="hover:underline"
                  >
                    {category}
                  </Link>
                ))
              : defaultCategories.map((category) => (
                  <span key={category} className="hover:underline">
                    {category}
                  </span>
                ))}
          </nav>
        </section>
      </div>
    </footer>
  );
}
