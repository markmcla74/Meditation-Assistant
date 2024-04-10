t=0:0.05:10;
[J,K]=size(t);
  
T=2;
m=2/T;
b=-1;
for i=1:K
  y(1,i)=m*mod(t(1,i),T) + b;
end;
plot(t,y);