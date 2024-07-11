import { useForm } from "react-hook-form";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { FormControl } from "@mui/material";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/mp.png";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = (e) => {
    setShowPassword((show) => !show);
    e.preventDefault();
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = (data) => {
    if (data.password) {
      console.log(data);

      navigate("/home");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="bg-gray-800 bg-opacity-70 w-2/4 flex flex-col items-center justify-evenly rounded-md py-8 gap-5 my-auto"
    >
      <a href="#">
        <img src={logo} className="w-20" />
      </a>
      <h1 className="text-5xl text-white font-extrabold text">
        <span className="text-cyan-500">Ab</span>
        <span className="text-[#3498db]">p</span>
        <span className="text-blue-500">as</span> 3.O
      </h1>
      <h2 className="text-3xl text-white">Sign in to your account</h2>

      {/* <MuiInput
        id="user-id"
        label="User Id *"
        size="normal"
        className="w-5/6 text-white"
        {...register("user_id")}
        InputLabelProps={{
          style: {
            fontSize: "10pt",
            color: "#fff",
          },
        }}
      /> */}

      <FormControl className="w-5/6 text-white" variant="outlined">
        <InputLabel
          htmlFor="outlined-adornment-password"
          style={{ color: "white", fontSize: "10pt" }}
        >
          User Id
        </InputLabel>
        <OutlinedInput
          id="user-id"
          label="User Id *"
          size="normal"
          {...register("user_id")}
        />
      </FormControl>

      <FormControl className="w-5/6 text-white" variant="outlined">
        <InputLabel
          htmlFor="outlined-adornment-password"
          style={{ color: "white", fontSize: "10pt" }}
        >
          Password
        </InputLabel>
        <OutlinedInput
          {...register("password")}
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? (
                  <IoEye className="text-blue-base text-white text-lg" />
                ) : (
                  <IoEyeOff className="text-blue-base text-white text-lg" />
                )}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <button
        type="submit"
        className="bg-blue-500 text-white w-1/4 py-2 rounded-md mt-3 mb-2 hover:bg-slate-500 hover:duration-700"
      >
        Login
      </button>
    </form>
  );
}
