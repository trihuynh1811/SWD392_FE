import { useEffect } from 'react';
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import card_icon from '../../image/Icon/card_icon.png';
import { SubscriptionApi } from '../../api/Api';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function PaymentForm() {
    const accessToken = useSelector((state) => state.auth.accessToken);
    console.log(accessToken);
    const currentUser = useSelector((state) => state.currentUser.user);
    console.log(currentUser.userId);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (accessToken === null) {
            navigate('/Login');
            return;
        };
        window.scrollTo(0, 0);
    }, [accessToken]);

    const genStripeToken = async () => {
        if (!stripe || !elements) {
            console.log("stripe or elements is null");
            return;
        };
        const cardNumberElement = elements.getElement(CardNumberElement);
        const {token, error} = await stripe.createToken(cardNumberElement);
        if (!token || error) {
            console.log(error || "token is null");
            throw error;
        };
        return token;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await genStripeToken();
        let data = {
            userId: parseInt(currentUser.userId),
            packageId: parseInt(searchParams.get("packageId")),
            stripeToken: token.id,
            isYearly: (searchParams.get("isYearly") === "true")
        };
        SubscriptionApi.BuySubscription(accessToken, data).then(res => {
            if (res.status === 200) {
                console.log(res.status);
                navigate("/"); // TODO nav to successful page
            };
        }).catch(e => console.log(e))
    };

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <p className='mb-[5px]'>Card number</p>
                    <CardNumberElement className='w-[410px] focus:outline-[#3D4449] py-[10px] pl-[17px] rounded-[10px] border border-[#9CA3A8] border-opacity-60' />
                    <div className='relative mb-[5px]'>
                        <img src={card_icon} className='w-[100px] left-[300px] bottom-[12px] absolute' alt="" />
                    </div>
                    <p className='mb-[5px]'>Expiry</p>
                    <CardExpiryElement className='mb-[5px] w-[410px] py-[10px] focus:outline-[#3D4449] pl-[17px] rounded-[10px] border border-[#9CA3A8] border-opacity-60' />
                    <p className='mb-[5px]'>Card CVC</p>
                    <CardCvcElement className='mb-[5px] w-[410px] py-[10px] pl-[17px] rounded-[10px] focus:outline-[#3D4449] border border-[#9CA3A8] border-opacity-60' />
                </div>

                <h3 className='w-[400px] text-[16px] text-[#A67E4E] tracking-[-0.2px] mt-[10px]'>Make sure your information is real. Please check all fields carefully</h3>
                <input type="submit" className='w-[410px] text-white hover:opacity-80 bg-[#000] mt-[40px] cursor-pointer py-[10px] pl-[17px] rounded-[10px] border border-[#9CA3A8] border-opacity-60' value={"Register"} />
                <p className='text-[13px] mt-[8px] leading-[17px] text-[#9CA3A8] w-[415px] ml-[5px]'>By confirming your subscription, you authorize ProAs to charge future payments based on their terms. You can always unsubscribe.</p>
            </form>
        </div>
    );
};
