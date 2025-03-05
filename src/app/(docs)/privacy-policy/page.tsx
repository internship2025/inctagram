import { ArrowBackOutline } from "@/assets/icons/components/outlined/ArrowBackOutline";
import { PATH } from "@/shared/constants/app-paths";
import { TextLink, Typography } from "@/shared/ui";
import styles from "./privacy.module.css"; //

const PrivacyPolicy = () => {
  return (
    <div>
      <TextLink
        className={styles.backLink}
        href={PATH.SIGN_UP}
        size={"medium"}
        underline={false}
      >
        <ArrowBackOutline className={styles.arrowIcon} />
        Back to Sign Up?
      </TextLink>
      <Typography className={styles.title} variant={"h1"}>
        Privacy Policy
      </Typography>
      <div className={styles.textContainer}>
        <Typography className={styles.textContent} variant={"regular14"}>
          <strong>Introduction</strong>
          At [Social Network Name], we are committed to protecting your privacy.
          This Privacy Policy outlines how we collect, use, and share your
          personal information when you use our services. By accessing our
          platform, you agree to the terms outlined in this policy.
          <br />
          <strong>Information We Collect</strong>
          We collect various types of information to provide and improve our
          services. This includes: Personal Information: Information you provide
          directly, such as your name, email address, and profile picture. Usage
          Data: Information about how you use our platform, including your
          interactions with other users and content. Cookies and Tracking
          Technologies: We use cookies to enhance your experience and analyze
          site traffic. <br />
          <strong>How We Use Your Information</strong>
          We use the information we collect for various purposes, including: To
          create and manage your account. To personalize your experience and
          content. To communicate with you about updates, promotions, and news.
          To analyze usage trends and improve our services. <br />
          <strong>Sharing Your Information</strong>
          We may share your information in the following circumstances: With
          Other Users: Your profile information and posts may be visible to
          other users on the platform. With Service Providers: We may employ
          third-party companies to facilitate our services, such as analytics
          and marketing. For Legal Reasons: We may disclose your information if
          required by law or to protect our rights. <br />
          <strong>Your Rights</strong>
          You have certain rights regarding your personal information: Access:
          You can request access to the personal information we hold about you.
          Correction: You can request to correct any inaccurate or incomplete
          information. Deletion: You can request the deletion of your personal
          information, subject to certain exceptions. <br />
          <strong>Data Security</strong>
          We take the security of your information seriously and implement
          appropriate technical and organizational measures to protect it.
          However, no method of transmission over the internet is completely
          secure, so we cannot guarantee its absolute security. <br />
          <strong>Changes to This Policy</strong>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new policy on this page. Your continued
          use of the service after any modifications to the Privacy Policy will
          constitute your acknowledgment of the modifications and your consent
          to abide by and be bound by the modified policy. <br />
          <strong>Contact Us</strong>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at: [Contact Information] [Social Network Name]
          [Address] [Email Address] <br />
          This Privacy Policy is effective as of [Effective Date]. Personal data
          (usually referred to just as „data“ below) will only be processed by
          us to the extent necessary and for the purpose of providing a
          functional and user-friendly website, including its contents, and the
          services offered there. Per Art. 4 No. 1 of Regulation (EU) 2016/679,
          i.e. the General Data Protection Regulation (hereinafter referred to
          as the „GDPR“), „processing“ refers to any operation or set of
          operations such as collection, recording, organization, structuring,
          storage, adaptation, alteration, retrieval, consultation, use,
          disclosure by transmission, dissemination, or otherwise making
          available, alignment, or combination, restriction, erasure, or
          destruction performed on personal data, whether by automated means or
          not. The following privacy policy is intended to inform you in
          particular about the type, scope, purpose, duration, and legal basis
          for the processing of such data either under our own control or in
          conjunction with others. We also inform you below about the
          third-party components we use to optimize our website and improve the
          user experience which may result in said third parties also processing
          data they collect and control. Our privacy policy is structured as
          follows: I. Information about us as controllers of your data II. The
          rights of users and data subjects III. Information about the data
          processing <br /> I. Information about us as controllers of your data
          The party responsible for this website (the „controller“) for purposes
          of data protection law is: [Firma] [Vorname, Nachname] [Straße,
          Hausnummer] [Postleitzahl, Ort] Telefon: [Telefonnummer] Telefax:
          [Faxnummer] E-Mail: [E-Mail] The controller’s data protection officer
          is: [DSB – Vorname, Nachname] Telefon: [DSB – Telefonnummer] Telefax:
          [DSB – Faxnummer] E-Mail: [DSB – E-Mail] [The following information
          must be added if an external data protection officer has been
          appointed]. [DSB-Extern – Straße, Hausnummer] [DSB-Extern –
          Postleitzahl, Ort] <br /> II. The rights of users and data subjects
          With regard to the data processing to be described in more detail
          below, users and data subjects have the right to confirmation of
          whether data concerning them is being processed, information about the
          data being processed, further information about the nature of the data
          processing, and copies of the data (cf. also Art. 15 GDPR); to correct
          or complete incorrect or incomplete data (cf. also Art. 16 GDPR); to
          the immediate deletion of data concerning them (cf. also Art. 17
          DSGVO), or, alternatively, if further processing is necessary as
          stipulated in Art. 17 Para. 3 GDPR, to restrict said processing per
          Art. 18 GDPR; to receive copies of the data concerning them and/or
          provided by them and to have the same transmitted to other
          providers/controllers (cf. also Art. 20 GDPR); to file complaints with
          the supervisory authority if they believe that data concerning them is
          being processed by the controller in breach of data protection
          provisions (see also Art. 77 GDPR). In addition, the controller is
          obliged to inform all recipients to whom it discloses data of any such
          corrections, deletions, or restrictions placed on processing the same
          per Art. 16, 17 Para. 1, 18 GDPR. However, this obligation does not
          apply if such notification is impossible or involves a
          disproportionate effort. Nevertheless, users have a right to
          information about these recipients. Likewise, under Art. 21 GDPR,
          users and data subjects have the right to object to the controller’s
          future processing of their data pursuant to Art. 6 Para. 1 lit. f)
          GDPR. In particular, an objection to data processing for the purpose
          of direct advertising is permissible. <br /> III. Information about
          the data processing Your data processed when using our website will be
          deleted or blocked as soon as the purpose for its storage ceases to
          apply, provided the deletion of the same is not in breach of any
          statutory storage obligations or unless otherwise stipulated below.
          <br />
        </Typography>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
