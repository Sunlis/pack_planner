import React from "react";
import { Page } from "../types";


type Props = {
  page: Page;
  onPageChange: (page: Page) => void;
};

const ACTIVE_BUTTON = {
  backgroundColor: 'rgb(114, 196, 187)',
  color: '#fff',
  border: '2px solid rgb(73, 150, 141)',
};
const INACTIVE_BUTTON = {
  backgroundColor: 'rgb(209, 207, 205)',
  color: '#666',
  border: '2px solid transparent',
};

export class Navigation extends React.Component<Props> {
  render() {
    const buttonStyle = {
      fontSize: '1.1rem',
      border: 'none',
      borderRadius: '0.5rem',
      padding: '0.5rem',
      color: '#fff',
      cursor: 'pointer',
    };
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '0.5rem',
      }}>
        {
          [{
            page: Page.PACK,
            label: 'Pack',
          }, {
            page: Page.SEARCH,
            label: 'Search',
          }].map(({ page, label }) => (
            <button key={page}
              className="button"
              style={{
                ...buttonStyle,
                ...(this.props.page === page ? ACTIVE_BUTTON : INACTIVE_BUTTON),
              }} onClick={() => this.props.onPageChange(page)}>
              {label}
            </button>
          ))
        }
      </div>
    );
  }
}
