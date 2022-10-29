import { makeStyles } from '@material-ui/core/styles';

// Theme
const useStyles = makeStyles(() => ({
    line: {
        // padding: '30rem 5rem',
        "& .css-z7uhs0-MuiStepConnector-line": {
          display: 'none'
        },
        "& .css-1bw0nnu-MuiStep-root ":{
            width: '100px',
            height: '4px',
            background: '#D9D9D9',
            margin:'100px 0 50px'
        },
        "& .css-vnkopk-MuiStepLabel-iconContainer":{
            display:'none'
        },
        "&.Mui-active": {
            "&&": {
              color: "white",

              "& * ": {
                color: "white"
              }
            }
          }
      }
}));

export default useStyles;
