'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { API_PATH } from "@/app/utils/http/api-query";
import { FormState } from "@/app/ui/molecule/form/form-root";

export async function kakaoLogin(code: string | null, state: string | null): Promise<FormState> {
  if (!code || !state) {
    return {
      isSuccess: false,
      isFailure: true,
      validationError: {},
      message: "잘못된 카카오 로그인 요청입니다.",
    };
  }

  try {
    const res = await fetch(`${API_PATH}/auth/kakao/redirect?code=${code}&state=${state}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error(`카카오 인증 실패: ${res.status}`);
    }

    // access token은 URL 쿼리, refresh token은 쿠키에 설정되어 있다고 가정
    const url = new URL(res.url);
    const accessToken = url.searchParams.get("access_token");

    if (accessToken) {
      cookies().set("token", accessToken, {
        secure: true,
        path: "/",
      });

      // refresh-token은 백엔드에서 HTTP-only cookie로 내려줬다고 가정
    }

    return {
      isSuccess: true,
      isFailure: false,
      validationError: {},
      message: "카카오 로그인 성공",
    };
  } catch (err) {
    console.error(err);
    return {
      isSuccess: false,
      isFailure: true,
      validationError: {},
      message: "카카오 로그인 중 오류가 발생했습니다.",
    };
  }
}
