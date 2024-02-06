// clientpaymentService.ts
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

const clientpaymentService = {
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

    createSubscription: async (token: string, reference_id: string): Promise<Object> => {
        console.log(token, 'token')
        try {
            const result = await axios.post<{ data: { user_id: string } }>(`${process.env.NEXT_PUBLIC_API}/api/v1/payment/order`, { user_id: reference_id }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // Add any other headers if needed
                },
            });

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
    initiateRazorpay: async (router: any, route: any, signupdata: any, reference_id: any): Promise<void> => {

        try {
            const subscriptiondata: any = await clientpaymentService.createSubscription(signupdata, reference_id);
            console.log(subscriptiondata, 'subscriptiondata')

            const res = await clientpaymentService.loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
            console.log(res, "24");

            if (!res) {
                clientpaymentService.displayPaymentToast("Razorpay SDK failed to load. Are you online?", 'error');
                return;
            }


            const options = {
                key: "rzp_test_lGt50R6T1BIUBR",
                amount: subscriptiondata?.amount.toString(),
                currency: subscriptiondata?.currency,
                name: "SyncUpp",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                order_id: subscriptiondata?.payment_id,
                handler: async (response: RazorpayResponse) => {
                    console.log(response, 'response');
                    const data = {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                        order_id: response.razorpay_subscription_id,
                        amount: subscriptiondata?.amount.toString(),
                        currency: subscriptiondata?.currency,
                        user_id: subscriptiondata?.user_id,
                        agency_id: subscriptiondata?.agency_id
                    };

                    const verificationResult: any = await clientpaymentService.verifyPaymentSignature(data);
                    console.log(verificationResult, 'verificationResult')


                    if (verificationResult?.data?.success) {
                        clientpaymentService.displayPaymentToast(verificationResult?.message, 'success');
                        router.push(route)
                    } else {
                        clientpaymentService.displayPaymentToast(verificationResult?.message, 'error');
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
            clientpaymentService.displayPaymentToast('Error during payment. Please try again.', 'error');
        }
    },
};

// Export the initiateRazorpay function
export const initiateRazorpay = clientpaymentService.initiateRazorpay;
