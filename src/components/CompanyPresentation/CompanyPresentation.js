import React from "react";
import classes from "./CompanyPresentation.module.css";
import about1 from "../../assets/images/about1.jpg";
import about2 from "../../assets/images/about2.jpg";
import Fade from "react-reveal/Fade";

const CompanyPresentation = () => {
  return (
    <div className={classes.mainWrapper}>
      <div className={classes.wrapper}>
        <Fade left>
          <div className={classes.firstSection}>
            <div className={classes.firstSectionPhoto}>
              <img
                src={about1}
                className={classes.firsSectionImg}
                alt="Dad with doughter and telescope"
              />
            </div>
            <div className={classes.firstSectionText}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Laboriosam quo explicabo, a ducimus quas cupiditate incidunt,
              voluptas libero debitis ratione earum asperiores! Repellat,
              adipisci dolore saepe voluptates laboriosam magnam obcaecati sunt
              tempore maiores nihil provident beatae dolor! Enim deleniti soluta
              impedit, quasi veritatis ratione beatae voluptas est sequi nemo
              laboriosam, nulla alias ut ea voluptate neque voluptatem modi
              corporis optio repellat quis eos.
            </div>
          </div>
        </Fade>
        <Fade right>
          <div className={classes.secondSection}>
            <div className={classes.secondSectionText}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Laboriosam quo explicabo, a ducimus quas cupiditate incidunt,
              voluptas libero debitis ratione earum asperiores! Repellat,
              adipisci dolore saepe voluptates laboriosam magnam obcaecati sunt
              tempore maiores nihil provident beatae dolor! Enim deleniti soluta
              impedit, quasi veritatis ratione beatae voluptas est sequi nemo
              laboriosam, nulla alias ut ea voluptate neque voluptatem modi
              corporis optio repellat quis eos. Eos pariatur laudantium ea
              sapiente doloremque quae officiis nulla, in vel voluptatum
              praesentium impedit accusamus alias dolores culpa iusto inventore
              expedita vero dolore odio, voluptatem, ducimus eum. Neque quae
              cumque repellat laboriosam libero tempora autem dicta ducimus.
            </div>
            <div className={classes.secondSectionPhoto}>
              <img
                src={about2}
                className={classes.secondSectionImg}
                alt="Man with telescope"
              />
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default CompanyPresentation;
