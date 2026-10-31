const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = '17e05a31-b14c-424f-8cda-344f269ccb5c';

export interface Web3FormsPayload {
  name: string;
  email: string;
  message: string;
  subject?: string;
  fromName?: string;
}

export async function submitWeb3Form(payload: Web3FormsPayload): Promise<{ success: boolean; message?: string }> {
  const formData = new FormData();
  formData.append('access_key', WEB3FORMS_ACCESS_KEY);
  formData.append('name', payload.name);
  formData.append('email', payload.email);
  formData.append('message', payload.message);
  formData.append('subject', payload.subject || 'New website form submission');
  formData.append('from_name', payload.fromName || 'Usama Zahid Website');

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  return {
    success: Boolean(data?.success),
    message: data?.message,
  };
}
