"use client";
"use client";
import { useSiteData } from "@deneb-ui/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas";

export function ContactForm() {
  const siteData = useSiteData();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    console.log("Form Data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto border p-6 rounded-lg">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="text-sm font-medium"
          data-preview-field-path="home.form.nameLabel"
          data-preview-style-target="home.form.nameLabel"
          data-preview-style-type="text">{siteData?.content?.home?.form?.nameLabel ?? "Name"}</label>
        <input
          {...register("name")}
          className="border p-2 rounded"
          placeholder={siteData?.content?.home?.form?.johnDoePlaceholder ?? "John Doe"}
          data-preview-field-path="home.form.johnDoePlaceholder" />
        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-sm font-medium"
          data-preview-field-path="home.form.emailLabel"
          data-preview-style-target="home.form.emailLabel"
          data-preview-style-type="text">{siteData?.content?.home?.form?.emailLabel ?? "Email"}</label>
        <input
          {...register("email")}
          type="email"
          className="border p-2 rounded"
          placeholder={siteData?.content?.home?.form?.johnExampleComPlaceholder ?? "john@example.com"}
          data-preview-field-path="home.form.johnExampleComPlaceholder" />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-sm font-medium"
          data-preview-field-path="home.form.messageLabel"
          data-preview-style-target="home.form.messageLabel"
          data-preview-style-type="text">{siteData?.content?.home?.form?.messageLabel ?? "Message"}</label>
        <textarea
          {...register("message")}
          className="border p-2 rounded"
          placeholder={siteData?.content?.home?.form?.yourMessagePlaceholder ?? "Your message..."}
          data-preview-field-path="home.form.yourMessagePlaceholder" />
        {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white p-2 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
