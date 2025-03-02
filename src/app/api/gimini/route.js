import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
    try {
        const { Intrest } = await req.json(); 
        if (!Intrest) {
            return Response.json({ error: "Interest is required" }, { status: 400 });
        }
        
        const apiKey = process.env.GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `Mujhe career ideas do jo mere interest "${Intrest}" par based ho. 🧠✨ 
        1. Mujhe ek se zyada career options batao jo is interest se related ho, har ek ke sath ek relevant emoji bhi do.
        2. Har career option ke liye ek short and clear roadmap batao ki kaise start karna hai aur kaunse skills seekhni chahiye. 🚀
        3. Roadmap ko steps me format karo jaise:
           - 🔹 Step 1: Yeh karo...
           - 🔹 Step 2: Yeh seekho...
        4. Hinglish me likho, lekin clear aur professional lagna chahiye.
        5. Extra unnecessary baatein mat likho, sirf kaam ki cheezein btao.
        6. Format aur readability acchi honi chahiye taki samajhne me easy ho. 
        
        Bhai ekdum mast aur engaging style me likhna! aur last me ek accha sa pdf bana ke dena jo formated way me ho 🎯`;
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();

        
        return Response.json({ career: responseText }, { status: 200 });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
