hr2@gmail.com
6JaSI!1sYCmO


Working of Refresh Token
Handover (Step 2): Hum immediately yeh dono tokens Supabase Client ko de dete hain (supabase.auth.setSession). Iska matlab hum Supabase ke code ko batate hain: "Yeh lo current user ke credentials, ab tum isse manage karo."
Auto-Refresh (The Magic): Supabase Client bohot smart hai. Usse pata hai token 1 ghante mein expire hoga. Woh background mein ek timer chalata hai. Jaise hi token expire hone wala hota hai (e.g., 50 mins baad), woh khud server se baat karke naya token le aata hai. Aapko kuch nahi karna padta.
Sync (Step 3): Humne ek listener lagaya hai (onAuthStateChange). Jaise hi Supabase naya token lata hai, humara listener jaag jata hai aur localStorage ko naye token se update kar deta hai. Isse aapke API calls (jo localStorage use karte hain) kabhi fail nahi honge kyunki unhe hamesha fresh token milta rahega.

temporary password
7e973bad506a

HR
bilal@gmail.com
f2bd1afd7714

Manager
a@gmail.com
a1ccd56f92e8