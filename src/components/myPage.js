import React from 'react';

import profile from '../assets/profile.png'
import article from '../assets/article.png'
import bookmark from '../assets/bookmark.png'
import arrow_right_black from "../assets/arrow_right_black.png"

import NavigationBar from './navigationBar';

const Mypage = () => {

    const profileData = [
        {name: '별다방프로출석러', startdate: '2024.07.01'}
    ]

    const CurrentDate = () => {
        const today = new Date();
        const userProfile = profileData[0];

         // startdate를 Date 객체로 변환
         const startDate = new Date(userProfile.startdate);

         // 두 날짜 사이의 차이 계산 (밀리초 단위)
         const timeDifference = today.getTime() - startDate.getTime();
 
         // 차이를 일 단위로 변환
         const howmuch = Math.floor(timeDifference / (1000 * 3600 * 24));

	return(
		<section className="min-h-screen w-full pt-[26px] pb-[32px] flex flex-col  px-[20px] bg-[#f6f6f6] relative" >
			<div className='text-[18px] font-AppleMedium items-start' >
                마이페이지
                <div className='flex pt-[28px]' >
                    <img src={profile} className='w-[74px] h-[74px]'></img>
                    <div className='items-start justify-center flex flex-col pl-[26px] gap-[4px]'>
                        <div className='text-[18px] font-[AppleBold]'>{userProfile.name}</div>
                        <div className='text-[16px] text-[gray] font-[AppleMedium]'>카페인 관리를 시작한지 <span className='text-purple'>{howmuch}일</span> 째</div>
                    </div>
                </div>
                <div className='mt-[42px] flex justify-center items-center'>
                    <div className='flex flex-col items-center'>
                        <img src={article} className='w-[40px] h-[40px]'></img>
                        <div className='text-[14px] font-AppleMedium '>내가 쓴 글</div>
                    </div>
                    <div className='border-l border-gray h-[72px] mx-[55px]'></div>
                    <div className='flex flex-col items-center'>
                        <img src={bookmark} className='w-[40px] h-[40px]'></img>
                        <div className='text-[14px] font-AppleMedium '>스크랩</div>
                    </div>
                </div>
                <div className='absolute left-0 right-0 w-full border-b-[6px] border-lightGray pt-[31px]'></div>
                <div className='flex flex-col mt-[35px]'>
                    <div>
                        <div className='flex justify-between py-[19px] '>
                            <div className='text-[16px] font-AppleSemiBold'>내 정보 수정</div>
                            <img src={arrow_right_black} className='w-[20px] h-full'></img>
                        </div>
                        <div className='w-full border-b-[1px] border-gray'></div>
                    </div>
                    <div>
                        <div className='flex justify-between py-[19px]'>
                            <div className='text-[16px] font-AppleSemiBold'>공지사항</div>
                            <img src={arrow_right_black} className='w-[20px] h-full'></img>
                        </div>
                        <div className='w-full border-b-[1px] border-gray'></div>
                    </div>
                    <div>
                        <div className='flex justify-between py-[19px]'>
                            <div className='text-[16px] font-AppleSemiBold'>자주 묻는 질문</div>
                            <img src={arrow_right_black} className='w-[20px] h-full'></img>
                        </div>
                        <div className='w-full border-b-[1px] border-gray'></div>
                    </div>
                    <div>
                        <div className='flex justify-between py-[19px]'>
                            <div className='text-[16px] font-AppleSemiBold'>1:1 문의</div>
                            <img src={arrow_right_black} className='w-[20px] h-full'></img>
                        </div>
                        <div className='w-full border-b-[1px] border-gray'></div>
                    </div>
                    <div>
                        <div className='flex justify-between py-[19px]'>
                            <div className='text-[16px] font-AppleSemiBold'>계정 연동</div>
                            <img src={arrow_right_black} className='w-[20px] h-full'></img>
                        </div>
                        <div className='w-full border-b-[1px] border-gray'></div>
                    </div>
                </div>
            </div>
            <NavigationBar page={"mypage"} className='absolute'/>
		</section>
	    );
    };
    return (
        <CurrentDate />
    );
};

export default Mypage;