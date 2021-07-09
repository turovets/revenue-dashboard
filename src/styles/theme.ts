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
};
