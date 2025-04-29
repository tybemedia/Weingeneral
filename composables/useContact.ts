import { ref } from 'vue';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const useContact = () => {
  const isSubmitting = ref(false);
  const error = ref<string | null>(null);

  const submitContactForm = async (formData: ContactFormData) => {
    isSubmitting.value = true;
    error.value = null;

    try {
      const response = await fetch('https://weingeneral.de/weingeneral/wp-json/contact-form/v1/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten';
      throw err;
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    submitContactForm,
    isSubmitting,
    error,
  };
}; 