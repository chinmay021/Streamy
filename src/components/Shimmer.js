const Shimmer = () => {
  return (
    <>
      <div className='flex flex-wrap' data-testid='shimmer'>
        {Array(10)
          .fill([])
          .map((e, index) => (
            <div key={index} className=' m-3 p-3 w-72 h-72'>
              <div className='w-full h-1/2 border rounded-sm bg-64 custom-linear-gradient animate-pulse'></div>
              <div
                className='w-[90%] h-[10%] mt-3 border rounded-sm
               bg-64 custom-linear-gradient animate-pulse '
              ></div>
              <div className='w-[70%] h-[7%]  mt-3 border rounded-sm bg-64 custom-linear-gradient animate-pulse'></div>
              <div className='w-[70%] h-[7%]  mt-3 border rounded-sm bg-64 custom-linear-gradient animate-pulse'></div>
            </div>
          ))}
      </div>
    </>
  );
};
export default Shimmer;
