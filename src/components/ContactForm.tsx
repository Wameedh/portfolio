import React, { useState, FormEvent, useEffect } from "react";
import styles from "./ContactForm.module.scss";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (status && status !== "Sending...") {
      const timer = setTimeout(() => setStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    console.log("Validation errors:", newErrors); // Debug log
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const updated = { ...prev, [name]: undefined };
        console.log("Updated errors:", updated); // Debug log
        return updated;
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("Sending...");

    try {
      const response = await fetch(
        "https://r75yhm350l.execute-api.us-west-1.amazonaws.com/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setStatus("Thanks for your submission!");
        setIsSubmitted(true);
      } else {
        setStatus("Oops! There was a problem submitting your form");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Oops! There was a network error");
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.confirmationMessage}>
        <h2>Thank you for your message!</h2>
        <p>
          We appreciate your time and will get back to you soon, God willing.
        </p>
      </div>
    );
  }

  const inputStyle = (fieldName: keyof FormErrors) => ({
    border: errors[fieldName] ? "1px solid red" : "1px solid #ccc",
  });

  return (
    <form onSubmit={handleSubmit} className={styles.contactForm}>
      <div className={styles.formGroup}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className={styles.formInput}
          style={inputStyle("name")}
        />
        {/* {errors.name && (
          <span className={styles.errorMessage}>{errors.name}</span>
        )} */}
      </div>
      <div className={styles.formGroup}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className={styles.formInput}
          style={inputStyle("email")}
        />
        {/* {errors.email && (
          <span className={styles.errorMessage}>{errors.email}</span>
        )} */}
      </div>
      <div className={styles.formGroup}>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows={4}
          className={styles.formInput}
          style={inputStyle("message")}
        ></textarea>
        {/* {errors.message && (
          <span className={styles.errorMessage}>{errors.message}</span>
        )} */}
      </div>
      <button type="submit" className={styles.btnPrimary}>
        Send Message
      </button>
      {status && (
        <p
          className={`${styles.statusMessage} ${
            status.includes("Oops") ? styles.error : ""
          }`}
        >
          {status}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
