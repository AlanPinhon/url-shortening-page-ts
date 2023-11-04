import { StaticSection } from '../StaticsSection/StaticSection';
import StaticBrandIcon from '/assets/images/icon-brand-recognition.svg';
import DetailedIcon from '/assets/images/icon-detailed-records.svg';
import FullyIcon from '/assets/images/icon-fully-customizable.svg';

export const InfoSection = () => {
  return (
    <section id="info-statics">

      <div className="statics-titles">
        <h3 className="statics-title">Advanced Statistics</h3>
        <p className="statics-paragraph">Track how your links are performing across the web with our 
        advanced statistics dashboard.</p>
      </div>

      <div className="statics-text-container">
        
        <StaticSection
          imgSrc={StaticBrandIcon}
          staticTextTitle="Brand Recognition"
          staticTextParagraph="Boost your brand recognition with each click. Generic links don't 
          mean a thing. Branded links help instil confidence in your content."
        />

        <StaticSection
          imgSrc={DetailedIcon}
          staticTextTitle="Detailed Records"
          staticTextParagraph="Gain insights into who is clicking your links. Knowing when and where 
          people engage with your content helps inform better decisions."
        />

        <StaticSection
          imgSrc={FullyIcon}
          staticTextTitle="Fully Customizable"
          staticTextParagraph="Improve brand awareness and content discoverability through customizable 
          links, supercharging audience engagement."
        />
        
      </div>

    </section>
  )
}