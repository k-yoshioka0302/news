import { Bell, User, Search } from "lucide-react";
import "./styles.scss"

export default function Home() {

  return (
    <>
      <header className="header">
        <div className="header-headline">
          <div className="headline-hum">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
          <h1 className="headline-text">
            AnimeNews
          </h1>
        </div>
        <ul className="header-nav">
          <li className="header-navlist">
            <div className="search-box">
              <label htmlFor="search-input">
              <Bell />
              </label>
              <input type="text" className="search-input" id="search-input" />
            </div>
          </li>
        </ul>
      </header>
    </>
  )
}