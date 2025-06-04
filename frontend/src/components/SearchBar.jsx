// src/components/SearchBar.js
import React from 'react';
import { Form } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

const SearchBar = ({ search, setSearch, placeholder = 'Search...' }) => {
  return (
    <Form.Group className="w-100">
      <div className="position-relative">
        <Form.Control
          type="search"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ps-4"
        />
        <Search 
          size={16}
          className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"
        />
      </div>
    </Form.Group>
  );
};

export default SearchBar;