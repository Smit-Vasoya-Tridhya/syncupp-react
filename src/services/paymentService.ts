// paymentService.ts
import axios from "axios";
import { toast } from 'react-hot-toast';
import { routes } from '@/config/routes';


interface RazorpayResponse {
    razorpay_payment_id?: string;
    razorpay_order_id?: string;
    razorpay_subscription_id?: string;
    razorpay_signature?: string;
}


interface CustomWindow extends Window {
    Razorpay?: any;
}

declare var window: CustomWindow;

const paymentService = {
    loadRazorpayScript: async (src: string): Promise<boolean> => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    },

    createSubscription: async (token: string): Promise<Object> => {
        console.log(token, 'token')
        try {
            const result = await axios.post<{ data: { payment_id: string } }>(`${process.env.NEXT_PUBLIC_API}/api/v1/payment/create-subscription`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // Add any other headers if needed
                },
            });
            console.log(result?.data?.data?.payment_id, "result");

            return result?.data?.data || {};
        } catch (error: any) {
            console.error('Error creating subscription:', error.message);
            throw new Error('Error creating subscription');
        }
    },

    verifyPaymentSignature: async (data: RazorpayResponse): Promise<string> => {
        try {
            const result = await axios.post<string>(`${process.env.NEXT_PUBLIC_API}/api/v1/payment/verify-signature`, data);
            console.log(result, "82");
            return result.data;
        } catch (error: any) {
            console.error('Error verifying payment signature:', error.message);
            throw new Error('Error verifying payment signature');
        }
    },

    displayPaymentToast: (message: string, type: 'success' | 'error' | 'default'): void => {
        if (type === 'success') {
            toast.success(message);
        } else if (type === 'error') {
            toast.error(message);
        } else {
            toast(message);
        }
    },

    // New function to initiate Razorpay
    initiateRazorpay: async (router: any, route: any, signupdata: any): Promise<void> => {

        try {
            const subscriptiondata: any = await paymentService.createSubscription(signupdata);
            console.log(subscriptiondata, 'subscriptiondata')

            const res = await paymentService.loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
            console.log(res, "24");

            if (!res) {
                paymentService.displayPaymentToast("Razorpay SDK failed to load. Are you online?", 'error');
                return;
            }

      
            const options = {
                key: "rzp_test_lGt50R6T1BIUBR",
                amount: subscriptiondata?.amount.toString(),
                currency: subscriptiondata?.currency,
                name: "SyncUpp",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                subscription_id: subscriptiondata?.payment_id,
                handler: async (response: RazorpayResponse) => {
                    console.log(response, 'response');
                    const data = {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_subscription_id,
                        razorpay_signature: response.razorpay_signature,
                    };

                    const verificationResult: any = await paymentService.verifyPaymentSignature(data);
                    console.log(verificationResult, 'verificationResult')


                    if (verificationResult?.success) {
                        paymentService.displayPaymentToast(verificationResult?.message, 'success');
                        router.push(route)
                    } else {
                        paymentService.displayPaymentToast(verificationResult?.message, 'error');
                    }
                },
                theme: {
                    color: "#111111",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error: any) {
            console.error('Error during payment:', error.message);
            paymentService.displayPaymentToast('Error during payment. Please try again.', 'error');
        }
    },
};

// Export the initiateRazorpay function
export const initiateRazorpay = paymentService.initiateRazorpay;
