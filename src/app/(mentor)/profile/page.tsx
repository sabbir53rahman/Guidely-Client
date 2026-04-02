"use client";

import { useState } from "react";
import {
  useGetMyMentorProfileQuery,
  useCreateMentorProfileMutation,
  useUpdateMentorProfileMutation,
} from "@/redux/features/mentor/mentorApi";
import {
  Loader2,
  Sparkles,
  Award,
  Briefcase,
  CheckCircle2,
  Phone,
  ClipboardList,
  User,
  Mail,
  Save,
  Rocket,
  DollarSign,
  Camera,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mentor } from "@/types";

// New component to handle the form state and logic
function MentorProfileForm({ existingProfile }: { existingProfile?: Mentor }) {
  const router = useRouter();
  const [createProfile, { isLoading: isCreating }] = useCreateMentorProfileMutation();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateMentorProfileMutation();

  // Initialize state directly from props - no useEffect needed!
  const [formData, setFormData] = useState({
    name: existingProfile?.name || "",
    bio: existingProfile?.bio || "",
    expertise: existingProfile?.expertise || "",
    experience: existingProfile?.experience || 0,
    hourlyRate: existingProfile?.hourlyRate || 0,
    contactNumber: existingProfile?.contactNumber || "",
    address: existingProfile?.address || "",
    registrationNumber: existingProfile?.registrationNumber || "",
    profilePhoto: existingProfile?.profilePhoto || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: (name === "experience" || name === "hourlyRate") ? Number(value) : value,
    }));
  };

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      const imgData = new FormData();
      imgData.append("image", file);

      const url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY}`;
      const response = await fetch(url, {
        method: "POST",
        body: imgData,
      });

      const data = await response.json();
      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          profilePhoto: data.data.display_url,
        }));
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error(data.error?.message || "Failed to upload image");
      }
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Failed to upload image");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (existingProfile) {
        await updateProfile({
          id: existingProfile.id,
          data: formData,
        }).unwrap();
        toast.success("Profile updated successfully!");
      } else {
        await createProfile(formData).unwrap();
        toast.success("Profile created successfully!");
      }
      router.push("/mentor-dashboard");
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container mx-auto max-w-6xl py-12 px-4">
      {/* Premium Header */}
      <div className="relative mb-12 p-12 rounded-[3.5rem] bg-linear-to-br from-primary via-primary/90 to-secondary border border-primary/10 shadow-2xl overflow-hidden group">
         {/* Decorative Elements */}
         <div className="absolute top-0 right-0 h-96 w-96 bg-secondary/30 rounded-full blur-[100px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110" />
         <div className="absolute bottom-0 left-0 h-64 w-64 bg-background/20 rounded-full blur-[80px] -ml-24 -mb-24 transition-transform duration-700 group-hover:scale-110" />

         <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="relative h-40 w-40 rounded-[2.5rem] overflow-hidden border-4 border-background/20 shadow-2xl bg-muted group-hover:rotate-3 transition-transform duration-500">
               {formData.profilePhoto ? (
                  <Image src={formData.profilePhoto} alt="Profile" fill className="object-cover" />
               ) : (
                  <div className="h-full w-full flex items-center justify-center bg-primary/20">
                     <User className="h-20 w-20 text-primary-foreground/50" />
                  </div>
               )}
               <label className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer z-20 backdrop-blur-xs">
                 {isUploadingImage ? (
                    <Loader2 className="h-8 w-8 text-white animate-spin" />
                 ) : (
                    <>
                      <Camera className="h-8 w-8 text-white mb-2" />
                      <span className="text-white text-xs font-bold tracking-wider">UPLOAD</span>
                    </>
                 )}
                 <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploadingImage} />
               </label>
            </div>
            
            <div className="text-primary-foreground text-center md:text-left flex-1">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-[10px] font-black uppercase tracking-widest mb-6 border border-primary-foreground/20 shadow-md backdrop-blur-md">
                 <Sparkles className="h-4 w-4 fill-primary-foreground text-primary-foreground" />
                 Professional Identity
               </div>
               <h1 className="text-5xl sm:text-6xl font-heading font-black tracking-tight mb-4 leading-tight">
                  {existingProfile ? `Welcome, ${formData.name || 'Mentor'}` : "Create Your Profile"}
               </h1>
               <p className="text-primary-foreground/80 text-xl font-medium max-w-2xl leading-relaxed">
                  {existingProfile 
                    ? "Manage your professional presence and keep your information up to date for your students."
                    : "Step into the spotlight. Set up your mentor profile and start making an impact in your field."
                  }
               </p>
            </div>
         </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Main Info */}
        <div className="lg:col-span-8 space-y-10">
          <Card className="rounded-[3rem] border-border/50 shadow-premium overflow-hidden border-2 bg-background/50 backdrop-blur-xl">
             <CardHeader className="bg-muted/30 pb-8 pt-10 px-10">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-primary/10 text-primary shadow-inner">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black tracking-tight">Personal Details</CardTitle>
                    <CardDescription className="text-base font-medium">Basic information that identifies you on the platform.</CardDescription>
                  </div>
                </div>
             </CardHeader>
             <CardContent className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Full Name</Label>
                    <div className="relative">
                       <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
                       <Input 
                         name="name"
                         placeholder="e.g. Asif Ahmed"
                         className="pl-12 h-14 rounded-2xl border-border/50 focus:ring-4 focus:ring-primary/10 transition-all text-lg font-bold"
                         value={formData.name}
                         onChange={handleChange}
                         required
                       />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Email Address</Label>
                    <div className="relative">
                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
                       <Input 
                         disabled
                         placeholder="asif@gmail.com"
                         className="pl-12 h-14 rounded-2xl border-border/50 bg-muted/50 text-muted-foreground text-lg font-bold cursor-not-allowed"
                         value={existingProfile?.email || ""}
                       />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">About Your Professional Journey (Bio)</Label>
                  <Textarea 
                    name="bio"
                    placeholder="Tell us about your experience, achievements, and mentorship style..."
                    className="min-h-[180px] rounded-[2rem] border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg leading-relaxed p-10"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
             </CardContent>
          </Card>

          <Card className="rounded-[3rem] border-border/50 shadow-premium overflow-hidden border-2 bg-background/50 backdrop-blur-xl">
             <CardHeader className="bg-muted/30 pb-8 pt-10 px-10">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-secondary/10 text-secondary shadow-inner">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black tracking-tight">Expertise & Experience</CardTitle>
                    <CardDescription className="text-base font-medium">Highlight your skills and years in the industry.</CardDescription>
                  </div>
                </div>
             </CardHeader>
             <CardContent className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                     <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Primary Expertise</Label>
                     <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
                        <Input 
                          name="expertise"
                          placeholder="e.g. Full Stack Development, UI/UX Design"
                          className="pl-12 h-14 rounded-2xl border-border/50 focus:ring-4 focus:ring-primary/10 transition-all text-lg font-bold"
                          value={formData.expertise}
                          onChange={handleChange}
                        />
                     </div>
                   </div>
                   <div className="space-y-3">
                     <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Years of Experience</Label>
                     <div className="relative">
                        <Rocket className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
                        <Input 
                          name="experience"
                          type="number"
                          placeholder="0"
                          className="pl-12 h-14 rounded-2xl border-border/50 focus:ring-4 focus:ring-primary/10 transition-all text-lg font-bold"
                          value={formData.experience}
                          onChange={handleChange}
                        />
                     </div>
                   </div>
                </div>

                 {/* Hourly Rate */}
                 <div className="space-y-3">
                   <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Hourly Rate (USD)</Label>
                   <div className="relative">
                     <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
                     <Input
                       name="hourlyRate"
                       type="number"
                       min={0}
                       placeholder="e.g. 50"
                       className="pl-12 h-14 rounded-2xl border-border/50 focus:ring-4 focus:ring-primary/10 transition-all text-lg font-bold"
                       value={formData.hourlyRate}
                       onChange={handleChange}
                     />
                     <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black uppercase tracking-widest text-muted-foreground/40">
                       /hr
                     </span>
                   </div>
                   <p className="text-xs text-muted-foreground/60 font-medium ml-2">
                     Set to 0 for free sessions. Students will be charged this rate per hour.
                   </p>
                 </div>
             </CardContent>
          </Card>
        </div>

        {/* Right: Contact & Action */}
        <div className="lg:col-span-4 space-y-10 sticky top-10">
           <Card className="rounded-[3rem] border-border/50 shadow-premium overflow-hidden border-2 bg-background/50 backdrop-blur-xl">
              <CardHeader className="bg-muted/30 p-8">
                 <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl font-black">Contact & Verification</CardTitle>
                 </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Phone Number</Label>
                    <Input 
                      name="contactNumber"
                      placeholder="+88017..."
                      className="rounded-xl border-border/50 h-12 font-bold"
                      value={formData.contactNumber}
                      onChange={handleChange}
                    />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Office/Home Address</Label>
                    <Input 
                      name="address"
                      placeholder="Dhaka, Bangladesh"
                      className="rounded-xl border-border/50 h-12 font-bold"
                      value={formData.address}
                      onChange={handleChange}
                    />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Registration/License ID</Label>
                    <div className="relative">
                       <ClipboardList className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                       <Input 
                         name="registrationNumber"
                         placeholder="REG-123456"
                         className="pl-10 rounded-xl border-border/50 h-12 font-bold"
                         value={formData.registrationNumber}
                         onChange={handleChange}
                       />
                    </div>
                 </div>
              </CardContent>
           </Card>

           <div className="space-y-4">
              <Button 
                type="submit"
                disabled={isCreating || isUpdating}
                className="w-full h-20 rounded-[2.5rem] bg-primary text-primary-foreground font-black text-xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                {isCreating || isUpdating ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <Save className="h-6 w-6" />
                )}
                {existingProfile ? "Update Profile" : "Create Profile"}
              </Button>
              
              <div className="p-10 rounded-[2.5rem] bg-secondary text-secondary-foreground shadow-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 h-40 w-40 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
                 <h3 className="text-xl font-black mb-3 relative z-10">Verification Status</h3>
                 <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 relative z-10">
                    <CheckCircle2 className={`h-6 w-6 ${existingProfile ? 'text-white' : 'text-white/40'}`} />
                    <span className="font-bold">{existingProfile ? "Verified Professional" : "Pending Initialization"}</span>
                 </div>
              </div>
           </div>
        </div>
      </form>
    </div>
  );
}

// Main Page Component
export default function CreateMentorProfilePage() {
  const { data, isLoading: isProfileLoading } = useGetMyMentorProfileQuery();
  
  if (isProfileLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <p className="text-muted-foreground font-black tracking-widest text-sm uppercase italic">
          Fetching your profile...
        </p>
      </div>
    );
  }

  const existingProfile = data?.data;

  // The 'key' prop is the secret sauce here.
  // Whenever existingProfile.id changes (e.g., from undefined to long-id-string),
  // React will discard the old MentorProfileForm and remount a brand new one.
  // This triggers a fresh useState initialization with the new props,
  // making useEffect completely unnecessary for state syncing.
  return (
    <MentorProfileForm 
      key={existingProfile?.id || "new-profile"} 
      existingProfile={existingProfile} 
    />
  );
}
