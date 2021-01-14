import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (
      <div>
        <div>
          <img src="https://www.nasa.gov/sites/default/files/thumbnails/image/651351main_nasasociallogo.jpg"/>
        </div>
        <div className={s.descriptionBlock}>ava + description</div>
      </div>
    );
  }
  
  export default ProfileInfo;
  