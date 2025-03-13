import { setError } from '../store/errorSlice';
import store from '../store/store';

let navigate = null;

export const setNavigate = (navigateFunc) => {
  navigate = navigateFunc;
};

export const handleError = (error) => {
  if (error.response?.status === 401) {
    // 401 Unauthorized – אם המשתמש לא מאומת ואין לו הרשאות לגשת למשאב.
    navigate?.('/');

    store.dispatch(
      setError({
        errMessage: error.response.data,
      })
    );
  } else if (error.response?.status === 403) {
    // 403 Forbidden – אם המשתמש מאומת, אבל אין לו הרשאות לגשת למשאב.

    navigate?.('/');
  } else if (error.response?.status === 404) {
    // אם מדובר בדף שלא נמצא, מעבירים לדף 404
  } else if (error.response?.status === 409) {
    // 409 אם החיבור נכשל בגלל קונפליקט בנתונים (ולא בעיה טכנית בשרת)
    store.dispatch(
      setError({
        errMessage: error.response.data,
      })
    );
  } else {
    // שגיאה כללית - ניתן להציג למשתמש
    return error.message || 'An unknown error occurred.';
  }
};
