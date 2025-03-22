import { Search } from 'lucide-react';
import React from 'react';
import './SearchBox.scss';

const SearchBox = () => {
    return (
        <div className="search-box">
            <label htmlFor="search-input">
                <Search />
            </label>
            <input
                type="text"
                className="search-input"
                id="search-input"
                placeholder="ニュースを検索..."
            />
        </div>
    );
};

export default SearchBox;