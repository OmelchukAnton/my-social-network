import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {

  if(!props.profile) {
    return <Preloader />
  }

    return (
      <div>
        <div>
          <img alt='img' src="https://www.nasa.gov/sites/default/files/thumbnails/image/651351main_nasasociallogo.jpg"/>
        </div>
        <div className={s.descriptionBlock}>
          <img alt='img' src={props.profile.photos.small}/>
          ava + description
        </div>
      </div>
    );
  }
  
  export default ProfileInfo;
  