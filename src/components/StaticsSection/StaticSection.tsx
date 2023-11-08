import './StaticsSectionStyles.css';

type StaticSectionProps = {
  imgSrc: string
  staticTextTitle: string
  staticTextParagraph: string
  sectionName:string
}

export const StaticSection = ({imgSrc, staticTextParagraph, staticTextTitle, sectionName}:StaticSectionProps) => (
  <div className={`statics-section ${sectionName}`}>
  
      <div className="statics-icon-container">
        <img className="statics-icon" src={imgSrc} alt="statics_icon" />
      </div>
      
      <h4 className="statics-text-title">{staticTextTitle}</h4>
      <p className="statics-text-paragraph">{staticTextParagraph}</p>
      
    </div>
)