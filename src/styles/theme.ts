import { createTheme } from '@material-ui/core/styles';

export const styles = {
  common: {
    fontSize: '12px',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.28)',
    error: 'rgba(200, 0, 0, 1)',
  },
};


export const themeConstants = {
  colors: {
    primary: '#006CB7',
    whiteSmoke: '#E6E6E6',
  }
}

export const theme = createTheme();

theme.overrides = {
  MuiButton: {
    root: {
      fontSize: styles.common.fontSize,
      fontWeight: 'normal',
      padding: styles.common.fontSize,
      marginBottom: styles.common.fontSize,
      textTransform: 'capitalize',
      '&$disabled':  {
        color: styles.text.disabled,
      },
    },
  },
  MuiTabs: {
    root: {
      borderBottom: `1px solid ${themeConstants.colors.whiteSmoke}`,
      marginBottom: '40px',
    },
    indicator: {
      height: '1px',
      zIndex: 10,
      backgroundColor: themeConstants.colors.primary,
    },
  },
  MuiTab: {
    root: {
      minWidth: '100px',
      fontWeight: 'normal',
      textTransform: 'none',
      fontSize: '14px',
      '@media (min-width: 960px)': {
        minWidth: '100px',
      },
    },
    selected: {
      color: themeConstants.colors.primary,
    },
  },
};
