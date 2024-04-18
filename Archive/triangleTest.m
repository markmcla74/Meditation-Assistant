t=0:5:10000;
[J,K]=size(t);
  
T=500;
m=1;
b=-1;
for i=1:K
  %y(1,i)=m*mod(t(1,i),T) + b;
  y(1,i)=abs((m*mod(t(1,i),T)) - (m*T/2)) -(T/4);
end;
plot(t,y);