import { useDispatch, useSelector } from 'react-redux';
import { alertActions, selectAlert } from '../slices/alertSlice';
import { ALERT_TYPE } from '../utils/constants';

function Banner() {
  const { data } = useSelector(selectAlert);
  const dispatch = useDispatch();

  function handleBannerColor(alertType: string) {
    if (alertType === ALERT_TYPE.SUCCESS) {
      return 'bg-green-500';
    }
    if (alertType === ALERT_TYPE.ERROR) {
      return 'bg-red-500';
    }
    if (alertType === ALERT_TYPE.WARNING) {
      return 'bg-orange-500';
    }
  }

  return (
    <div className="h-screen overflow-auto fixed top-0 right-0 p-5 flex flex-col gap-5 pointer-events-none">
      {data.map((alert, index) => (
        <div
          key={index}
          className={`min-w-60 p-5 ${handleBannerColor(alert.type)} flex items-center justify-center cursor-pointer pointer-events-auto`}
          onClick={() => {
            dispatch(alertActions.removeMessage(index));
          }}
        >
          <p className=" text-white">{alert.message}</p>
        </div>
      ))}
    </div>
  );
}

export default Banner;
