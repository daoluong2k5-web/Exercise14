import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './Theme.css';

const Theme = () => {
  const { theme, currentTheme, toggleTheme } = useTheme();

  return (
    <div
      className={`theme-wrapper theme-mode-${theme}`}
      style={{
        '--current-bg': currentTheme.background,
        '--current-fg': currentTheme.foreground
      }}
    >
      <div className="theme-card-inner">
        <div className="theme-button-area">
          <button
            type="button"
            className="toggle-theme-button"
            onClick={toggleTheme}
            style={{
              backgroundColor: currentTheme.background,
              color: currentTheme.foreground
            }}
          >
            Toggle Theme
          </button>
        </div>

        <div className="theme-status-card">
          <h4>Active Theme State</h4>
          <div className="theme-details">
            <div className="detail-item">
              <span className="detail-label">Theme Name:</span>
              <span className={`badge-theme ${theme}`}>
                {theme.toUpperCase()}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Button Background:</span>
              <span className="color-preview">
                <span
                  className="color-dot"
                  style={{ backgroundColor: currentTheme.background }}
                ></span>
                <code>{currentTheme.background}</code>
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Button Foreground (Text):</span>
              <span className="color-preview">
                <span
                  className="color-dot"
                  style={{ backgroundColor: currentTheme.foreground }}
                ></span>
                <code>{currentTheme.foreground}</code>
              </span>
            </div>
          </div>
          <p className="theme-hint">
            💡 Click the <strong>Toggle Theme</strong> button above to switch between Light (#eeeeee) and Dark (#61dafb) modes!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Theme;